<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import router from '@/router'

const productsStore = useProductsStore()
const { basket, totalPrice, comment } = storeToRefs(productsStore)
onMounted(async () => {
  if (!basket.value.length)
    await router.push({ name: 'products' })
})
</script>

<template>
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
</template>

<style scoped>

</style>
