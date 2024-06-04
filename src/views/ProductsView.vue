<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { ProductResponseEntities } from '@/types/Product'
import { useProductsStore } from '@/stores/products'

import ProductsInfoCard from '@/components/products/ProductsInfoCard.vue'
import ProductsDrawerInfoCard from '@/components/products/ProductsDrawerInfoCard.vue'
import { useChangeCount } from '@/composables/useChangeCount'

const productsStore = useProductsStore()
const { changeCount } = useChangeCount()
const { products } = storeToRefs(productsStore)
const selectedProduct = ref<ProductResponseEntities | null>(null)
const isOpen = ref(false)

function showExtendedInfo(product: ProductResponseEntities) {
  selectedProduct.value = product
  isOpen.value = true
}
</script>

<template>
  <div>
    <div class="fixed top-0" />

    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 gap-y-5">
      <ProductsInfoCard />
      <ProductsDrawerInfoCard v-model="isOpen" :selected-product="selectedProduct" />
      <div v-for="product in products" :key="product.id" class="shadow-md rounded-xl flex flex-col cursor-pointer" @click.prevent>
        <div class="p-0 relative ">
          <img loading="lazy" class="object-cover rounded-t-xl aspect-[4/3] w-full" :src="product.preview" alt="" @click="showExtendedInfo(product)">
          <Badge v-if="product.basketCount" :class="{ 'animate-scaleUp': product.isAnimatingProcess }" class="absolute top-2 right-2">
            к заказу — {{ product.basketCount }}
          </Badge>
        </div>
        <div class="p-2 flex-1 flex  gap-2 flex-col">
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
