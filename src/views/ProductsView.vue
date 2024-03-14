<script setup lang="ts">
import { onMounted } from 'vue'
import { MainButton } from 'vue-tg'
import { storeToRefs } from 'pinia'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { ProductResponseEntities } from '@/types/Product'
import { useProductsApi } from '@/services/products/useProductsApi'
import { useOrdersApi } from '@/services/orders/useOrdersApi'
import router from '@/router'
import { useProductsStore } from '@/stores/products'

const { getProducts } = useProductsApi()
const { createOrder } = useOrdersApi()
const productsStore = useProductsStore()
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
function changeCount(product: ProductResponseEntities, direction: 'inc' | 'dec') {
  product.isAnimatingProcess = true

  product.basketCount = product.basketCount ?? 0
  product.count = product.count ?? 0

  const canIncrease = direction === 'inc' && product.count > 0
  const canDecrease = direction === 'dec' && product.basketCount > 0

  if (canIncrease) {
    product.basketCount += 1
    product.count -= 1
  }
  else if (canDecrease) {
    product.basketCount -= 1
    product.count += 1
  }

  setTimeout(() => product.isAnimatingProcess = false, 300)
}

async function handleCreateOrder() {
  if (!basket.value.length)
    return
  try {
    // await createOrder(basket.value)
    // await fetchAndSetProducts()
    await router.push({ name: 'payment' })
  }
  catch (error) {
    console.error('Error creating order:', error)
  }
}

onMounted(async () => {
  if (products.value.length)
    return
  await fetchAndSetProducts()
})
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-3 gap-y-5">
    <div v-for="product in products" :key="product.id" class="shadow-md rounded-xl">
      <div class="p-0 relative ">
        <img class="object-cover rounded-xl aspect-[4/3] w-full" :src="product.preview" alt="">
        <Badge v-if="product.basketCount" :class="{ 'animate-scaleUp': product.isAnimatingProcess }" class="absolute top-2 right-2">
          к заказу — {{ product.basketCount }}
        </Badge>
      </div>
      <div class="p-2">
        <div class="text-gray-600 mt-1 leading-[14px] text-[14px]">
          {{ product.name }}
        </div>
        <div class="text-gray-400 leading-3 text-[12px]">
          Осталось: {{ product.count }}
        </div>
        <div class="pt-2 flex-row flex justify-between">
          <div class="text-xl">
            {{ product.price }}<span class="text-sm">₽</span>
          </div>
          <div v-if="!product.basketCount">
            <Button size="sm" @click="changeCount(product, 'inc')">
              Добавить
            </Button>
          </div>
          <div v-else class="flex flex-row gap-2 items-center">
            <Button
              size="sm"
              @click="changeCount(product, 'dec')"
            >
              –
            </Button>
            <Button
              size="sm" :disabled="!product.count" @click="changeCount(product, 'inc')"
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </div>
    <MainButton v-if="basket.length" color="#e19746" text="Перейти к оплате" @click="handleCreateOrder" />
  </div>
</template>

<style scoped>

</style>
