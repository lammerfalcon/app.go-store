import type { ProductResponseEntities } from '@/types/Product'

export function useChangeCount() {
  function changeCount(product: ProductResponseEntities, direction: 'inc' | 'dec') {
    console.log(product)
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
  return {
    changeCount,
  }
}
