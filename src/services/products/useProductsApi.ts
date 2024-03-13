import { useApi } from '../api'
import type { ProductResponse } from '@/types/Product'

export function useProductsApi() {
  async function getProducts() {
    return await useApi<ProductResponse>(`/products`, {
      method: 'GET',
    })
  }
  return {
    getProducts,
  }
}
