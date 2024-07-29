import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { ResponseEntities } from '@/types/Product'

export const useProductsStore = defineStore('products', () => {
  const products = ref<ResponseEntities>({})
  const comment = ref<string>('')

  const basket = computed(() => {
    const basketItems: { product_id: number, count: number, price: number, name: string }[] = []

    for (const category in products.value) {
      const categoryProducts = products.value[category]
      categoryProducts.forEach((product) => {
        if (product.basketCount && product.basketCount > 0) {
          basketItems.push({
            product_id: product.id,
            count: product.basketCount,
            price: product.price,
            name: product.name,
          })
        }
      })
    }

    return basketItems
  })
  const totalPrice = computed(() => {
    return basket.value.reduce((acc, product) => {
      return acc + product.price * product.count
    }, 0)
  })
  return { products, basket, totalPrice, comment }
})
