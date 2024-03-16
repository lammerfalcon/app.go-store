<script setup lang="ts">
import { BackButton, MainButton } from 'vue-tg'
import { computed } from 'vue'
import { useColorMode } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import router from '@/router'
import { useProductsStore } from '@/stores/products'
import { useProductsApi } from '@/services/products/useProductsApi'
import { useOrdersApi } from '@/services/orders/useOrdersApi'

const mode = useColorMode()

function handleBackButton() {
  router.push('/')
}
const showBackButton = computed(() => {
  return router.currentRoute.value.path !== '/'
})
const productsStore = useProductsStore()
const { getProducts } = useProductsApi()
const { createOrder } = useOrdersApi()
const { products, basket, totalPrice } = storeToRefs(productsStore)
async function fetchAndSetProducts() {
  try {
    const { entities } = await getProducts()
    products.value = entities
  }
  catch (error) {
    console.error('Error fetching todos:', error)
  }
}
async function handleCreateOrder() {
  if (!basket.value.length)
    return
  try {
    await createOrder(basket.value)
    await fetchAndSetProducts()
    await router.push({ name: 'payment' })
  }
  catch (error) {
    console.error('Error creating order:', error)
  }
}
</script>

<template>
  <div class="p-4 max-w-[1280px] mx-auto">
    <BackButton v-if="showBackButton" @click="handleBackButton" />
    <!--    TODO: persisted state with basket clear -->
    <!--    <Button class="fixed top-5 left-5 z-50 bg-primary/80"> -->
    <!--      <span class="opacity-100"> -->
    <!--        Очистить корзину -->
    <!--      </span> -->
    <!--    </Button> -->
    <router-view v-slot="{ Component, route }">
      <transition :name="route.meta.transition || 'fade'">
        <component :is="Component" />
      </transition>
    </router-view>
    <MainButton v-if="basket.length && $route.path !== '/'" :text="`Всего к оплате: ${totalPrice.toString()} ₽`" @click="handleCreateOrder" />
    <MainButton v-else-if="basket.length && $route.path === '/'" color="#e19746" text="Перейти к оплате" @click="$router.push({ name: 'payment' })" />
  </div>
  <!--  <Confirm v-if="showConfirm === true" message="Hello?" @close="handleConfirmClose" /> -->
</template>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.25s ease-out;
}
.slide-left-enter-from {
  opacity: 0;
  transform: translate(0, 120px);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate(0, -120px);
}
.slide-right-enter-from {
  opacity: 0;
  transform: translate(0, -120px);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate(0, 120px);
}
</style>
