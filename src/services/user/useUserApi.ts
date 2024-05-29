import { useApi } from '@/services/api'
import type { IUserResponse } from '@/types/User'

export function useUserApi() {
  async function getUserInfo(): Promise<IUserResponse> {
    return await useApi<IUserResponse>(`/user`, {
      method: 'GET',
    })
  }
  return {
    getUserInfo,
  }
}
