<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const productsMock = [
  {
    id: 1,
    name: 'Продукт 1',
    preview: 'https://via.placeholder.com/150',
    stock: 10,
    price: 1000,
    basketCount: 0,
    isAnimatingProcess: false,
  },
  {
    id: 2,
    name: 'Продукт 2',
    preview: 'https://via.placeholder.com/150',
    stock: 5,
    price: 2000,
    basketCount: 0,
    isAnimatingProcess: false,
  },
  {
    id: 3,
    name: 'Продукт 3',
    preview: 'https://via.placeholder.com/150',
    stock: 20,
    price: 1500,
    basketCount: 0,
    isAnimatingProcess: false,
  },
  {
    id: 4,
    name: 'Продукт 4',
    preview: 'https://via.placeholder.com/150',
    stock: 0,
    price: 2500,
    basketCount: 0,
    isAnimatingProcess: false,
  },
  {
    id: 5,
    name: 'Продукт 5',
    preview: 'https://via.placeholder.com/150',
    stock: 8,
    price: 1800,
    basketCount: 0,
    isAnimatingProcess: false,
  },
  {
    id: 6,
    name: 'Продукт 6',
    preview: 'https://via.placeholder.com/150',
    stock: 15,
    price: 1100,
    basketCount: 0,
    isAnimatingProcess: false,
  },
  {
    id: 7,
    name: 'Продукт 7',
    preview: 'https://via.placeholder.com/150',
    stock: 6,
    price: 1300,
    basketCount: 0,
    isAnimatingProcess: false,
  },
  {
    id: 8,
    name: 'Продукт 8',
    preview: 'https://via.placeholder.com/150',
    stock: 12,
    price: 900,
    basketCount: 0,
    isAnimatingProcess: false,
  },
  {
    id: 9,
    name: 'Продукт 9',
    preview: 'https://via.placeholder.com/150',
    stock: 18,
    price: 1400,
    basketCount: 0,
    isAnimatingProcess: false,
  },
  {
    id: 10,
    name: 'Продукт 10',
    preview: 'https://via.placeholder.com/150',
    stock: 4,
    price: 2100,
    basketCount: 0,
    isAnimatingProcess: false,
  },
]
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-3 gap-y-5">
    <div class="col-span-2 rounded-xl text-secondary shadow-md bg-primary/80 p-4 text-lg  font-extralight tracking-wide">
      ...Запрашиваем данные
    </div>
    <div v-for="product in productsMock" :key="product.id" class="shadow-md rounded-xl flex flex-col cursor-pointer">
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
            <Button size="sm">
              Добавить
            </Button>
          </div>
          <div v-else class="flex flex-row gap-2 items-center">
            <Button
              size="sm"
            >
              –
            </Button>
            <Button
              size="sm" :disabled="!product.stock"
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
