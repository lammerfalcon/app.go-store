<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import { Input } from '@/components/ui/input'
import BankCard from '@/components/order/BankCard.vue'
import router from '@/router'

const productsStore = useProductsStore()
const { basket, totalPrice, comment } = storeToRefs(productsStore)
onMounted(async () => {
  if (!basket.value.length)
    await router.push({ name: 'products' })
})
</script>

<template>
  <div class="min-h-screen max-w-[380px] mx-auto flex flex-col gap-6">
    <!--    <div @click="router.back()"> -->
    <!--      назад -->
    <!--    </div> -->
    <BankCard />
    <section class="p-4 bg-secondary rounded-xl">
      <h3 class="text-xl">
        Как оплатить?
      </h3>
      <ul class="list-disc px-4 mt-2">
        <li class=" leading-5">
          Сделайте перевод по указанному номеру карты
        </li>
        <li class="leading-5">
          После успешного перевода нажмите кнопку "Подтвердить оплату"
        </li>
      </ul>
    </section>
    <section class="p-4 bg-secondary rounded-xl">
      <Input v-model="comment" type="text" />
    </section>
    <section class="p-4 bg-secondary rounded-xl">
      <h3 class="text-xl font-extralight mb-1">
        Ваш заказ:
      </h3>
      <div v-for="item in basket" :key="item.product_id">
        <div class="grid grid-cols-5">
          <div class="col-span-3 font-semibold">
            {{ item.name }}
          </div>
          <div class="self-end">
            x{{ item.count }}
          </div>
          <div class="self-end">
            {{ item.price * item.count }}₽
          </div>
        </div>
      </div>
      <div class="border-t border-secondary-foreground grid grid-cols-5 mt-2">
        <div />
        <div />
        <div />
        <div>Всего</div>
        <div>{{ totalPrice }}₽</div>
      </div>
    </section>
  </div>
</template>

<style scoped>

</style>
