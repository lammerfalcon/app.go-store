<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { MainButton } from 'vue-tg'
import { useProductsStore } from '@/stores/products'
import BankCard from '@/components/Order/BankCard.vue'

const productsStore = useProductsStore()
const { basket, totalPrice } = storeToRefs(productsStore)
</script>

<template>
  <div class="min-h-screen flex flex-col gap-6">
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
      <h3 class="text-lg">
        Ваш заказ:
      </h3>
      <div v-for="item in basket" :key="item.product_id">
        <div class="grid grid-cols-5">
          <div class="col-span-3">
            {{ item.name }}
          </div>
          <div>x{{ item.count }}</div>
          <div class="self-end">
            {{ item.price * item.count }}₽
          </div>
        </div>
      </div>
      <div class="grid grid-cols-5 mt-2">
        <div />
        <div />
        <div />
        <div>Всего</div>
        <div>{{ totalPrice }}₽</div>
      </div>
    </section>
  </div>
  <MainButton v-if="basket.length" :text="`Всего к оплате: ${totalPrice.toString()} ₽`" @click="handleCreateOrder" />
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
