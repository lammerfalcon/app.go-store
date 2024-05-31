<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { ProductResponseEntities } from '@/types/Product'
import { useProductsStore } from '@/stores/products'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { useUserStore } from '@/stores/user'

const productsStore = useProductsStore()
const { products } = storeToRefs(productsStore)
const selectedProduct = ref<ProductResponseEntities>(null)
const isOpen = ref(false)

function changeCount(product: ProductResponseEntities, direction: 'inc' | 'dec') {
  product.isAnimatingProcess = true

  if (product.animationTimeoutId)
    clearTimeout(product.animationTimeoutId)

  product.basketCount = product.basketCount ?? 0
  // product.stock = product.stock ?? 0

  const canIncrease = direction === 'inc'
  const canDecrease = direction === 'dec' && product.basketCount > 0

  if (canIncrease)
    product.basketCount += 1

  else if (canDecrease)
    product.basketCount -= 1

  product.animationTimeoutId = setTimeout(() => {
    product.isAnimatingProcess = false
    // Ensure to clear the timeout ID once the animation is no longer in process
    product.animationTimeoutId = null
  }, 150)
}

function showExtendedInfo(product: ProductResponseEntities) {
  selectedProduct.value = product
  isOpen.value = true
}
const userStore = useUserStore()
</script>

<template>
  <div>
    <div class="fixed top-0" />

    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 gap-y-5">
      <div v-if="userStore.shopConfig?.greeting_text" class="col-span-2 rounded-xl text-secondary shadow-md bg-primary/80 p-4 text-lg  font-extralight tracking-wide">
        {{ userStore.shopConfig?.greeting_text }}
      </div>
      <Drawer v-if="selectedProduct" v-model:open="isOpen">
        <DrawerContent>
          <DrawerHeader>
            <img class="w-full" :src="selectedProduct?.preview" alt="">
            <DrawerTitle>
              {{ selectedProduct.name }}
            </DrawerTitle>
            <DrawerDescription>{{ selectedProduct.description }}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <div class="p-2 flex-1 flex  gap-2 flex-col">
<!--              <span class="leading-[14px] text-[14px]  ">-->
<!--                {{ selectedProduct.name }}-->
<!--              </span>-->
              <span class="text-muted-foreground leading-3 text-[12px]">
                В корзине: {{ selectedProduct.basketCount }}
              </span>
              <div class="mt-auto flex-row flex items-center justify-between">
                <div class="text-xl">
                  {{ selectedProduct.price }}<span class="text-sm">₽</span>
                </div>
                <div v-if="!selectedProduct.basketCount">
                  <Button size="sm" @click.stop="changeCount(selectedProduct, 'inc')">
                    Добавить
                  </Button>
                </div>
                <div v-else class="flex flex-row gap-2 items-center">
                  <Button
                    size="sm"
                    @click.stop="changeCount(selectedProduct, 'dec')"
                  >
                    –
                  </Button>
                  <Button
                    size="sm" @click.stop="changeCount(selectedProduct, 'inc')"
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
            <DrawerClose>
              <Button variant="outline">
                Закрыть
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

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
          <div class="mt-auto flex-row flex items-center justify-between">
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
