import { useApi } from '../api'

export function useOrdersApi() {
  async function createOrder(orderProducts: any[]) {
    return await useApi(`/orders`, {
      method: 'POST',
      body: orderProducts,
    })
  }
  return {
    createOrder,
  }
}
