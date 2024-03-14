<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { MainButton } from 'vue-tg'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { ProductResponseEntities } from '@/types/Product'
import { useProductsApi } from '@/services/products/useProductsApi'
import { useOrdersApi } from '@/services/orders/useOrdersApi'
import router from '@/router'

const { getProducts } = useProductsApi()
const { createOrder } = useOrdersApi()

const products = ref<ProductResponseEntities[]>([])

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
const basket = computed(() => {
  return products.value.reduce<{ product_id: number, count: number, price: number }[]>((acc, product) => {
    if (product.basketCount && product.basketCount > 0) {
      acc.push({
        product_id: product.id,
        count: product.basketCount,
        price: product.price,
      })
    }
    return acc
  }, [])
})
const totalPrice = computed(() => {
  return basket.value.reduce((acc, product) => {
    return acc + product.price * product.count
  }, 0)
})

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
  await fetchAndSetProducts()
})
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-3 gap-y-6">
    <div v-for="product in products" :key="product.id">
      <div class="p-0 relative ">
        <img class="object-cover rounded-xl aspect-square w-full" :src="product.preview" alt="">
        <Badge v-if="product.basketCount" :class="{ 'animate-scaleUp': product.isAnimatingProcess }" class="absolute top-2 right-2">
          к заказу — {{ product.basketCount }}
        </Badge>
      </div>
      <div class="text-gray-600">
        {{ product.name }}
      </div>
      <div class="text-gray-600">
        Осталось: {{ product.count }}
      </div>
      <div class="pt-2 flex-row flex justify-between">
        <div class="text-xl">
          {{ product.price }} ₽
        </div>
        <div v-if="!product.basketCount">
          <Button @click="changeCount(product, 'inc')">
            ADD
          </Button>
        </div>
        <div v-else class="flex flex-row gap-2 items-center">
          <Button
            @click="changeCount(product, 'dec')"
          >
            —
          </Button>
          <Button :disabled="!product.count" @click="changeCount(product, 'inc')">
            +
          </Button>
        </div>
      </div>
    </div>
    <MainButton v-if="basket.length" :text="`Всего к оплате: ${totalPrice.toString()} ₽`" @click="handleCreateOrder" />
  </div>
</template>

<style scoped>

</style>
