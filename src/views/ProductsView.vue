<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { ProductResponseEntities } from '@/types/Product'
import { useProductsStore } from '@/stores/products'

import ProductsInfoCard from '@/components/products/ProductsInfoCard.vue'
import ProductsDrawerInfoCard from '@/components/products/ProductsDrawerInfoCard.vue'
import { useChangeCount } from '@/composables/useChangeCount'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

const productsStore = useProductsStore()
const { changeCount } = useChangeCount()
const { products } = storeToRefs(productsStore)
const selectedProduct = ref<ProductResponseEntities | null>(null)
const isOpen = ref(false)

function showExtendedInfo(product: ProductResponseEntities) {
  selectedProduct.value = product
  isOpen.value = true
}
const selectedCategory = ref<string | null>(Object.keys(products)[0])

onMounted(() => {
  selectedCategory.value = Object.keys(products.value)[0]
})
const categoryProducsts = computed(() => {
  if (!selectedCategory.value)
    return products.value[0]
  return products.value[selectedCategory.value]
})
</script>

<template>
  <div>
    <div class="fixed top-0" />

    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 gap-y-5">
      <ProductsInfoCard />
      <ProductsDrawerInfoCard v-model="isOpen" :selected-product="selectedProduct" />

      <Carousel
        :opts="{
          dragFree: true,
        }" class="col-span-2"
      >
        <CarouselContent class="-ml-2">
          <CarouselItem v-for="category in Object.keys(products)" :key="category" class="p-2 basis-auto" @click="selectedCategory = category">
            <div :class="selectedCategory === category ? 'bg-gray-200' : ''" class="cursor-pointer outline rounded px-2 py-1 outline-gray-200">
              {{ category }}
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      <div v-for="product in categoryProducsts" :key="product.id" class="shadow-md rounded-xl flex flex-col cursor-pointer" @click.prevent>
        <div class="p-0 relative ">
          <img loading="lazy" class="object-cover rounded-t-xl aspect-[3/4] w-full" :src="product.img_url" alt="" @click="showExtendedInfo(product)">
          <Badge v-if="product.basketCount" :class="{ 'animate-scaleUp': product.isAnimatingProcess }" class="absolute top-2 right-2">
            к заказу — {{ product.basketCount }}
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
                size="sm" @click.stop="changeCount(product, 'inc')"
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
