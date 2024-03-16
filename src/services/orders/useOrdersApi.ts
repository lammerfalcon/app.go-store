import { useApi } from '../api'

interface Payload {
  order: {
    products: {
      product_id: number
      count: number
      price: number
      name: string
    }[]
  }
  user: WebAppUser | undefined

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
