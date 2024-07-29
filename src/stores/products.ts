import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { ProductResponseEntities } from '@/types/Product'

export const useProductsStore = defineStore('products', () => {
  const products = ref<{ [categoryName: string]: ProductResponseEntities[] }>({})
  const comment = ref<string>('')

  const basket = computed(() => {
    return Object.values(products.value).map(items => items.reduce<{ product_id: number, count: number, price: number, name: string }[]>((acc, product) => {
      if (product.basketCount && product.basketCount > 0) {
        acc.push({
          product_id: product.id,
          count: product.basketCount,
          price: product.price,
          name: product.name,
        })
      }
      return acc
    }, []))
  })
  const totalPrice = computed(() => {
    return basket.value.reduce((acc, product) => {
      return acc + product.price * product.count
    }, 0)
  })
  return { products, basket, totalPrice, comment }
})
// TODO: add persist if needed
