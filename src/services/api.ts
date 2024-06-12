import { ofetch } from 'ofetch'
import type { FetchOptions } from 'ofetch'
import defu from 'defu'
import { useWebApp } from 'vue-tg'
import router from '@/router'

const { initDataUnsafe: { start_param } } = useWebApp()

export function useApi<T>(url: string, options: FetchOptions = {}) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'X-Start-Param': import.meta.env.DEV ? 'lammerfalcon' : (start_param || ''),
  }
  const fetchOptions: FetchOptions = {
    baseURL: import.meta.env.VITE_BASE_API_URL,
    headers,
    async onResponseError({ response }) {
      if (response.status === 402)
        await router.push('/error')
    },
  }
  const mergedOptions: any = defu(options, fetchOptions)
  return ofetch<T>(url, mergedOptions)
}
