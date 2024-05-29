import { useApi } from '../api'
import type { ProductResponse } from '@/types/Product'

export function useProductsApi() {
  async function getProducts(): Promise<ProductResponse> {
    return await useApi<ProductResponse>(`/products`, {
      method: 'GET',
      query: {
        limit: 20,
      },
    })
  }
  return {
    getProducts,
  }
}
