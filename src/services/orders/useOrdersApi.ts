import { useApi } from '../api'
import type { IOrderResponse } from '@/types/Order'

export interface Payload {
  order: {
    products: {
      product_id: number
      count: number
      price: number
      name: string
    }[]
    comment: string
  }
  client: WebAppUser | undefined

}
export function useOrdersApi() {
  async function createOrder(payload: Payload): Promise<IOrderResponse> {
    return await useApi<IOrderResponse>(`/orders`, {
      method: 'POST',
      body: payload,
    })
  }
  return {
    createOrder,
  }
}
