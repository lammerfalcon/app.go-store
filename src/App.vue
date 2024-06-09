<script setup lang="ts">
import { inject } from '@vercel/analytics'

import {
  BackButton,
  ClosingConfirmation,
  ExpandedViewport,
  MainButton,
  useWebApp,
  useWebAppMainButton,
  useWebAppNavigation,
  useWebAppPopup,
} from 'vue-tg'
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import router from '@/router'
import { useProductsStore } from '@/stores/products'
import { type Payload, useOrdersApi } from '@/services/orders/useOrdersApi'
import { useDeviceDetect } from '@/composables/useDeviceDetect'
import { useUserApi } from '@/services/user/useUserApi'
import { useUserStore } from '@/stores/user'
import { Button } from '@/components/ui/button'
import { useProductsApi } from '@/services/products/useProductsApi'
import ProductsMockList from '@/components/products/ProductsMockList.vue'
import Spinner from '@/components/Loading/Spinner.vue'
import type { IOrderResponse } from '@/types/Order'

inject({
  mode: import.meta.env.DEV ? 'development' : 'production',
})

const { initDataUnsafe } = useWebApp()
const { showConfirm, showPopup } = useWebAppPopup()
const { deviceType } = useDeviceDetect()
const { getUserInfo } = useUserApi()
const { createOrder } = useOrdersApi()
const productsStore = useProductsStore()
const { storeUserInfo } = useUserStore()
const { basket, totalPrice, comment, products } = storeToRefs(productsStore)
const { getProducts } = useProductsApi()
const loading = ref(true)
const color = ref('')
const { openLink } = useWebAppNavigation()
onMounted(async () => {
  try {
    // const rootStyles = getComputedStyle(document.documentElement)
    // color.value = rootStyles.getPropertyValue('--primary').trim()
    loading.value = true
    const response = await getUserInfo()
    await fetchAndSetProducts()
    storeUserInfo(response.entities.user)
  }
  catch (error) {
    console.error('Error fetching user info:', error)
  }
  finally {
    loading.value = false
  }
})

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
    await router.push({ name: 'order' })
  }
  else {
    const confirmationText = useUserStore().paymentType !== 'card' ? 'Перейти на страницу оплаты?' : 'Вы подтверждаете перевод?'
    showConfirm(confirmationText, async (ok) => {
      if (ok) {
        try {
          useWebAppMainButton().showMainButtonProgress()
          const payload: Payload = {
            order: {
              products: basket.value,
              comment: comment.value,
            },
            client: initDataUnsafe.user,
          }

          const response: IOrderResponse = await createOrder(payload)
          if (useUserStore().paymentType !== 'card')
            openLink(response.entities.confirmation_url)
          window.Telegram.WebApp.close()
          // await router.push({ name: 'payment' })
        }
        catch (error) {
          console.error('Error creating order:', error)
          return showPopup({ message: 'У нас что-то поломалось, стараемся починить как можно скорее!' })
        }
        finally {
          useWebAppMainButton().hideMainButtonProgress()
        }
      }
    })
  }
}

function handleBackButton() {
  router.push('/')
}

const showBackButton = computed(() => {
  return router.currentRoute.value.path !== '/'
})
const mainButtonText = computed(() => {
  let text = ''
  if (basket.value.length && router.currentRoute.value.path !== '/')
    useUserStore().paymentType !== 'card' ? text = 'Перейти к оплате' : text = 'Подтвердить перевод'
  else if (basket.value.length && router.currentRoute.value.path === '/')
    text = `Всего: ${totalPrice.value}₽. Перейти к оплате`
  return text
})
// const theme = ref('default')

// function setTheme(newTheme) {
//   document.documentElement.className = '' // Reset any existing theme classes
//   if (newTheme !== 'default')
//     document.documentElement.classList.add(`theme-${newTheme}`)
//
//   theme.value = newTheme
// }
</script>

<template>
  <div>
    <!--    <div class="grid grid-cols-3 gap-6 w-1/2"> -->
    <!--      <button @click="setTheme('default')"> -->
    <!--        Default Theme -->
    <!--      </button> -->
    <!--      <button class="text-yellow-500" @click="setTheme('yellow')"> -->
    <!--        Yellow Theme -->
    <!--      </button> -->
    <!--      <button class="text-violet-500" @click="setTheme('violet')"> -->
    <!--        Violet Theme -->
    <!--      </button> -->
    <!--      <button class="text-blue-500" @click="setTheme('blue')"> -->
    <!--        blue Theme -->
    <!--      </button> -->
    <!--      <button class="text-green-500" @click="setTheme('green')"> -->
    <!--        green Theme -->
    <!--      </button> -->
    <!--      <button class="text-orange-500" @click="setTheme('orange')"> -->
    <!--        green Theme -->
    <!--      </button> -->
    <!--      <button class="text-rose-500" @click="setTheme('rose')"> -->
    <!--        green Theme -->
    <!--      </button> -->

    <!--    </div> -->
    <ExpandedViewport />
    <ClosingConfirmation />

    <div v-if="!loading" class="p-4 max-w-[1280px] mx-auto">
      <Button v-if="showBackButton && deviceType === 'Android'" class="mb-4" size="sm" @click="handleBackButton">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="currentColor" d="m5.83 9l5.58-5.58L10 2l-8 8l8 8l1.41-1.41L5.83 11H18V9z" /></svg>
      </Button>
      <BackButton v-if="showBackButton && deviceType !== 'Android'" @click="handleBackButton" />
      <router-view />
      <MainButton v-if="basket.length" ref="mainButton" :text="mainButtonText" @click="handleCreateOrder" />
    </div>
    <div v-else class="p-4 max-w-[1280px] mx-auto">
      <ProductsMockList class="z-1 blur" />
      <Spinner />
    </div>
  </div>
</template>
