<script setup lang="ts">
import {
  BackButton,
  ClosingConfirmation,
  ExpandedViewport,
  MainButton,
  useWebApp,
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

const { initDataUnsafe } = useWebApp()
const { showConfirm, showPopup } = useWebAppPopup()
const { deviceType } = useDeviceDetect()
const { getUserInfo } = useUserApi()
const { createOrder } = useOrdersApi()
const productsStore = useProductsStore()
const { storeUserInfo } = useUserStore()
const { basket, totalPrice, comment } = storeToRefs(productsStore)
const { getProducts } = useProductsApi()
const { products } = storeToRefs(productsStore)
const loading = ref(true)
const color = ref('')

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
    await router.push({ name: 'payment' })
  }
  else {
    showConfirm('Вы подтверждаете перевод?', async (ok) => {
      if (ok) {
        try {
          const payload: Payload = {
            order: {
              products: basket.value,
              comment: comment.value,
            },
            client: initDataUnsafe.user,
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

function handleBackButton() {
  router.push('/')
}

const showBackButton = computed(() => {
  return router.currentRoute.value.path !== '/'
})

const mainButtonText = computed(() => {
  let text = null
  if (basket.value.length && router.currentRoute.value.path !== '/')
    text = 'Подтвердить перевод'
  else if (basket.value.length && router.currentRoute.value.path === '/')
    text = `Всего: ${totalPrice.value}. Перейти к оплате`
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
      <MainButton v-if="basket.length" :text="mainButtonText" @click="handleCreateOrder" />
    </div>
    <div v-else class="p-4 max-w-[1280px] mx-auto">
      <ProductsMockList class="z-1 blur" />
      <div class="fixed z-99 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" role="status">
        <svg aria-hidden="true" class="w-20 h-20 text-primary-foreground animate-spin fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>
