import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { ProductResponseEntities } from '@/types/Product'
import type { CategoriesResponseEntities } from '@/types/Categories'
import type { Basket } from '@/types/Basket'

export const useProductsStore = defineStore('products', () => {
  const products = ref<ProductResponseEntities[]>([])
  const categories = ref<CategoriesResponseEntities[]>([{
    id: null,
    name: 'Все',
  }])
  const comment = ref<string>('')

  const basket = ref<Basket[]>([])
  const totalPrice = computed(() => {
    return basket.value.reduce((acc, product) => {
      return acc + product.price * product.count
    }, 0)
  })

  function changeCount(product: ProductResponseEntities, direction: 'inc' | 'dec') {
    console.log(product)
    product.isAnimatingProcess = true

    if (product.animationTimeoutId)
      clearTimeout(product.animationTimeoutId)

    product.basketCount = product.basketCount ?? 0
    // product.stock = product.stock ?? 0

    const canIncrease = direction === 'inc'
    const canDecrease = direction === 'dec' && product.basketCount > 0

    if (canIncrease) {
      product.basketCount += 1
      if (basket.value.find(item => item.product_id === product.id)) {
        basket.value.map((item) => {
          if (item.product_id === product.id) {
            item.count += 1
          }
          return item
        })
      }
      else {
        basket.value.push({
          product_id: product.id,
          count: 1,
          price: product.price,
          name: product.name,
        })
      }
    }
    else if (canDecrease) {
      product.basketCount -= 1
      basket.value.map((item) => {
        if (item.product_id === product.id) {
          item.count -= 1
        }
        return item
      })
    }

    product.animationTimeoutId = setTimeout(() => {
      product.isAnimatingProcess = false
      // Ensure to clear the timeout ID once the animation is no longer in process
      product.animationTimeoutId = null
    }, 150)
  }
  return { products, basket, totalPrice, comment, categories, changeCount }
})
