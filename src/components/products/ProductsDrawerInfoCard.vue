<script setup lang="ts">
import { X } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import type { ProductResponseEntities } from '@/types/Product'
import { useProductsStore } from '@/stores/products'

defineProps<{
  selectedProduct: ProductResponseEntities | null
}>()

const isOpen = defineModel<boolean>()
const { changeCount } = useProductsStore()
</script>

<template>
  <Drawer v-model:open="isOpen">
    <DrawerContent>
      <DrawerHeader class="relative">
        <DrawerClose class="absolute top-0 right-4">
          <Button size="icon" variant="outline">
            <X />
          </Button>
        </DrawerClose>
        <img class="max-h-[50vh] aspect-[3/4] w-full object-contain" :src="selectedProduct?.img_url" alt="">
        <DrawerTitle>
          {{ selectedProduct.name }}
        </DrawerTitle>
        <DrawerDescription>{{ selectedProduct.description }}</DrawerDescription>
      </DrawerHeader>
      <DrawerFooter>
        <div class="p-2 flex-1 flex  gap-2 flex-col">
          <!--              <span class="leading-[14px] text-[14px]  "> -->
          <!--                {{ selectedProduct.name }} -->
          <!--              </span> -->
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
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>

<style scoped>

</style>
