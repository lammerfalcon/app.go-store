<script setup lang="ts">
import { BackButton, ClosingConfirmation, ExpandedViewport, MainButton, useWebApp, useWebAppPopup } from 'vue-tg'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import router from '@/router'
import { useProductsStore } from '@/stores/products'
import { useProductsApi } from '@/services/products/useProductsApi'
import { useOrdersApi } from '@/services/orders/useOrdersApi'
import { useDeviceDetect } from '@/composables/useDeviceDetect'

const { initDataUnsafe } = useWebApp()
const { showConfirm, showPopup } = useWebAppPopup()
function handleBackButton() {
  router.push('/')
}
const showBackButton = computed(() => {
  return router.currentRoute.value.path !== '/'
})
const productsStore = useProductsStore()
const { getProducts } = useProductsApi()
const { createOrder } = useOrdersApi()
const { products, basket } = storeToRefs(productsStore)
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
  if (router.currentRoute.value.path === '/') {
    await router.push({ name: 'payment' })
  }
  else {
    showConfirm('Вы подтверждаете перевод?', async (ok) => {
      if (ok) {
        try {
          const payload = {
            order: {
              products: basket.value,
            },
            user: initDataUnsafe.user,
          }

          await createOrder(payload)
          window.Telegram.WebApp.close()
        }
        catch (error) {
          console.error('Error creating order:', error)
          return showPopup({ message: 'У нас что-то поломалось, стараемся починить как можно скорее!' })
        }
      }
    })
  }
}
const { deviceType } = useDeviceDetect()
const mainButtonText = computed(() => {
  let text = null
  if (basket.value.length && router.currentRoute.value.path !== '/')
    text = 'Подтвердить перевод'
  else if (basket.value.length && router.currentRoute.value.path === '/')
    text = 'Перейти к оплате'
  return text
})
</script>

<template>
  <ExpandedViewport />
  <ClosingConfirmation />

  <div class="p-4 max-w-[1280px] mx-auto">
    <!-- Добавляйте больше условий для других типов устройств -->
    <Button v-if="showBackButton && deviceType === 'Android'" class="mb-4" size="sm" @click="handleBackButton">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="m5.83 9l5.58-5.58L10 2l-8 8l8 8l1.41-1.41L5.83 11H18V9z" /></svg>
    </Button>

    <BackButton v-if="showBackButton && deviceType !== 'Android'" @click="handleBackButton" />
    <!--    TODO: persisted state with basket clear -->
    <!--    <Button class="fixed top-5 left-5 z-50 bg-primary/80"> -->
    <!--      <span class="opacity-100"> -->
    <!--        Очистить корзину -->
    <!--      </span> -->
    <!--    </Button> -->
    <router-view v-slot="{ Component, route }">
      <transition mode="out-in" :name="route.meta.transition || 'fade'">
        <component :is="Component" />
      </transition>
    </router-view>
    <MainButton v-if="basket.length" color="#e19746" :text="mainButtonText" @click="handleCreateOrder" />
  </div>
  <!--  <Confirm v-if="showConfirm === true" message="Hello?" @close="handleConfirmClose" /> -->
</template>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.4s ease-out;
}
.slide-left-enter-from {
  opacity: 0;
  transform: translate(0, 370px);
}
.slide-left-leave-to {
  opacity: 0;
  transform: translate(0, -370px);
}
.slide-right-enter-from {
  opacity: 0;
  transform: translate(0, -370px);
}
.slide-right-leave-to {
  opacity: 0;
  transform: translate(0, 370px);
}
</style>
