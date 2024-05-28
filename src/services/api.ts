import { ofetch } from 'ofetch'
import type { FetchOptions } from 'ofetch'
import defu from 'defu'
import { useWebApp } from 'vue-tg'

const { initDataUnsafe: { start_param } } = useWebApp()

export function useApi<T>(url: string, options: FetchOptions = {}) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'X-Start-Param': start_param || '',
  }
  const fetchOptions: FetchOptions = {
    baseURL: import.meta.env.VITE_BASE_API_URL,
    headers,
  }
  const mergedOptions = defu(options, fetchOptions)
  return ofetch<T>(url, mergedOptions)
}
