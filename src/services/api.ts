import { ofetch } from 'ofetch'
import type { FetchOptions } from 'ofetch'
import defu from 'defu'

export function useApi<T>(url: string, options: FetchOptions = {}) {
  const fetchOptions: FetchOptions = {
    baseURL: import.meta.env.VITE_BASE_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const mergedOptions = defu(options, fetchOptions)
  return ofetch<T>(url, mergedOptions)
}
