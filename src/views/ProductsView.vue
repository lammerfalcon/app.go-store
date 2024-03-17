<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { ProductResponseEntities } from '@/types/Product'
import { useProductsApi } from '@/services/products/useProductsApi'
import { useProductsStore } from '@/stores/products'

const { getProducts } = useProductsApi()
const productsStore = useProductsStore()
const { products } = storeToRefs(productsStore)
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

  if (product.animationTimeoutId)
    clearTimeout(product.animationTimeoutId)

  product.basketCount = product.basketCount ?? 0
  product.stock = product.stock ?? 0

  const canIncrease = direction === 'inc' && product.stock > 0
  const canDecrease = direction === 'dec' && product.basketCount > 0

  if (canIncrease) {
    product.basketCount += 1
    product.stock -= 1
  }
  else if (canDecrease) {
    product.basketCount -= 1
    product.stock += 1
  }

  product.animationTimeoutId = setTimeout(() => {
    product.isAnimatingProcess = false
    // Ensure to clear the timeout ID once the animation is no longer in process
    product.animationTimeoutId = null
  }, 150)
}

onMounted(async () => {
  if (products.value.length)
    return
  await fetchAndSetProducts()
})
</script>

<template>
  <div>
    <div class="fixed top-0" />
    <!--    <div @click="handleCreateOrder"> -->
    <!--      вперед -->
    <!--    </div> -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 gap-y-5">
      <div class="col-span-2 rounded-xl text-secondary shadow-md bg-primary/80 p-4 text-lg  font-extralight tracking-wide">
        Домашний ремесленный хлеб своими руками и&nbsp;от&nbsp;всего сердца 💛
      </div>
      <div v-for="product in products" :key="product.id" class="shadow-md rounded-xl flex flex-col">
        <div class="p-0 relative ">
          <img loading="lazy" class="object-cover rounded-t-xl aspect-[4/3] w-full" :src="product.preview" alt="">
          <Badge v-if="product.basketCount" :class="{ 'animate-scaleUp': product.isAnimatingProcess }" class="absolute top-2 right-2">
            к заказу — {{ product.basketCount }}
          </Badge>
        </div>
        <div class="p-2 flex-1 flex  gap-2 flex-col">
          <span class="leading-[14px] text-[14px]  ">
            {{ product.name }}
          </span>
          <span class="text-muted-foreground leading-3 text-[12px]">
            Осталось: {{ product.stock }}
          </span>
          <div class="mt-auto flex-row flex items-center justify-between">
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
                size="sm" :disabled="!product.stock" @click="changeCount(product, 'inc')"
              >
                +
              </Button>
            </div>
          </div>
        </div>
      </div>
      <!--    <button v-if="basket.length" color="#e19746" text="Перейти к оплате" @click="handleCreateOrder"> -->
      <!--      go -->
      <!--    </button> -->
    </div>
  </div>
</template>

<style scoped>
</style>
