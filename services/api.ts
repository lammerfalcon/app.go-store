import {ofetch} from "ofetch";
import type { FetchOptions } from 'ofetch'

export function useApi<T>(url: string, options: any = {}) {
  const fetchOptions: FetchOptions = {
    baseURL: import.meta.env.VITE_BASE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
  }

  return ofetch<T>(url, fetchOptions)
}
