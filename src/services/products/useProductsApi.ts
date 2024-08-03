import { useApi } from '../api'
import type { ProductResponse } from '@/types/Product'

interface IQuery {
  category_id?: number | null
}
export function useProductsApi() {
  async function getProducts(query?: IQuery): Promise<ProductResponse> {
    return await useApi<ProductResponse>(`/products`, {
      method: 'GET',
      query: {
        ...query,
        per_page: 220,
      },
    })
  }
  return {
    getProducts,
  }
}
