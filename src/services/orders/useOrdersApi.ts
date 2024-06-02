import { useApi } from '../api'

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
  async function createOrder(payload: Payload) {
    return await useApi(`/orders`, {
      method: 'POST',
      body: payload,
    })
  }
  return {
    createOrder,
  }
}
