<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { ProductResponseEntities } from '@/types/Product'
import { useProductsStore } from '@/stores/products'

import ProductsInfoCard from '@/components/products/ProductsInfoCard.vue'
import ProductsDrawerInfoCard from '@/components/products/ProductsDrawerInfoCard.vue'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { useProductsApi } from '@/services/products/useProductsApi'
import type { Basket } from '@/types/Basket'

const productsStore = useProductsStore()
const { changeCount } = productsStore
const { products, categories, basket } = storeToRefs(productsStore)
const selectedProduct = ref<ProductResponseEntities | null>(null)
const isOpen = ref(false)
const { getProducts } = useProductsApi()

function showExtendedInfo(product: ProductResponseEntities) {
  selectedProduct.value = product
  isOpen.value = true
}
const selectedCategory = ref<number | null>(null)
const loading = ref<boolean>(false)
async function fetchAndSetProducts() {
  try {
    loading.value = true
    const { entities } = await getProducts({ category_id: selectedCategory.value })
    products.value = entities
    products.value.forEach((product) => {
      const basketProduct = basket.value.find((basketProduct: Basket) => basketProduct.product_id === product.id)
      if (basketProduct)
        product.basketCount = basketProduct.count
    })
  }
  catch (error) {
    console.error('Error fetching products:', error)
  }
  finally {
    loading.value = false
  }
}

watch(selectedCategory, fetchAndSetProducts)
const progress = ref(13)

watchEffect((cleanupFn) => {
  const timer = setTimeout(() => progress.value = 66, 500)
  const timer2 = setTimeout(() => progress.value = 100, 500)
  cleanupFn(() => clearTimeout(timer))
  cleanupFn(() => clearTimeout(timer2))
})
</script>

<template>
  <div>
    <div v-if="loading" class="w-full absolute top-0">
      <div class="h-1.5 w-full bg-gray-200 overflow-hidden">
        <div class="progress w-full h-full bg-primary rounded left-right" />
      </div>
    </div>
    <div :class="loading && 'pointer-events-none'" class="grid grid-cols-2 md:grid-cols-4 gap-3 gap-y-5">
      <ProductsInfoCard />
      <ProductsDrawerInfoCard v-model="isOpen" :selected-product="selectedProduct" />

      <Carousel
        :opts="{
          dragFree: true,
        }" class="col-span-2"
      >
        <CarouselContent class="-ml-2">
          <CarouselItem v-for="category in categories" :key="category.id" class="p-2 basis-auto" @click="selectedCategory = category.id">
            <div :class="selectedCategory === category.id ? 'bg-gray-200' : ''" class="cursor-pointer outline rounded px-2 py-1 outline-gray-200">
              {{ category.name }}
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      <div v-for="product in products" :key="product.id" class="shadow-md rounded-xl flex flex-col cursor-pointer" @click.prevent>
        <div class="p-0 relative ">
          <img loading="lazy" class="object-cover rounded-t-xl aspect-[3/4] w-full" :src="product.img_url" alt="" @click="showExtendedInfo(product)">
          <Badge v-if="product.basketCount" :class="{ 'animate-scaleUp': product.isAnimatingProcess }" class="absolute top-2 right-2">
            <!-- todo: computed -->
            к заказу — {{ basket.find((basketProduct: Basket) => basketProduct.product_id === product.id).count }}
          </Badge>
        </div>
        <div class="p-3 flex-1 flex  gap-5 flex-col">
          <span class="leading-[14px] text-[14px]  ">
            {{ product.name }}
          </span>
          <!--          <span class="text-muted-foreground leading-4 text-[12px]"> -->
          <!--            Описание: -->
          <!--          </span> -->
          <div class="mt-auto flex-row flex items-center justify-between" @click.prevent.stop>
            <div class="text-md">
              {{ product.price }}<span class="text-sm">₽</span>
            </div>
            <div v-if="!product.basketCount">
              <Button size="sm" @click.stop="changeCount(product, 'inc')">
                Добавить
              </Button>
            </div>
            <div v-else class="flex flex-row gap-2 items-center">
              <Button
                size="sm"
                @click.stop="changeCount(product, 'dec')"
              >
                –
              </Button>
              <Button
                size="sm"
                @click.stop="changeCount(product, 'inc')"
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
.progress {
  animation: progress 1s infinite linear;
}

.left-right {
  transform-origin: 0 50%;
}
@keyframes progress {
  0% {
    transform:  translateX(0) scaleX(0);
  }
  40% {
    transform:  translateX(0) scaleX(0.4);
  }
  100% {
    transform:  translateX(100%) scaleX(0.5);
  }
}
</style>
