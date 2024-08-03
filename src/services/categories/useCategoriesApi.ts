import { useApi } from '../api'
import type { CategoriesResponse } from '@/types/Categories'

export function useCategoriesApi() {
  async function fetchCategories(): Promise<CategoriesResponse> {
    return await useApi<CategoriesResponse>(`/categories`, {
      method: 'get',
    })
  }
  return {
    fetchCategories,
  }
}
