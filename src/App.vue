<script setup lang="ts">
import { BackButton, MainButton, useWebApp, useWebAppPopup } from 'vue-tg'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import router from '@/router'
import { useProductsStore } from '@/stores/products'
import { useProductsApi } from '@/services/products/useProductsApi'
import { useOrdersApi } from '@/services/orders/useOrdersApi'

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
          await fetchAndSetProducts()
          useWebApp().close()
        }
        catch (error) {
          console.error('Error creating order:', error)
          return showPopup({ message: 'У нас что-то поломалось, стараемся починить как можно скорее!' })
        }
      }
    })
  }
}
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
  <div class="p-4 max-w-[1280px] mx-auto">
    <BackButton v-if="showBackButton" @click="handleBackButton" />
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
