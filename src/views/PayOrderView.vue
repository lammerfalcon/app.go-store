<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { MainButton } from 'vue-tg'
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()

const { basket, totalPrice } = storeToRefs(productsStore)
</script>

<template>
  <div class="container align-middle">
    <h3 class="text-lg">
      Ваш заказ:
    </h3>
    <div v-for="item in basket" :key="item.product_id">
      <div class="grid grid-cols-3">
        <div>{{ item.name }}</div>
        <div>x{{ item.count }}</div>
        <div class="self-end">
          {{ item.price * item.count }}₽
        </div>
      </div>
    </div>
    <div class="grid grid-cols-3">
      <div />
      <div>Всего</div>
      <div>{{ totalPrice }}₽</div>
    </div>
  </div>
  <MainButton v-if="basket.length" :text="`Всего к оплате: ${totalPrice.toString()} ₽`" @click="handleCreateOrder" />
</template>

<style scoped>

</style>
