import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IShopSettings, IUser } from '@/types/User'

export const useUserStore = defineStore('user', () => {
  const user = ref<IUser>()
  const shopConfig = ref<IShopSettings>()
  function storeUserInfo(userInfo: IUser) {
    user.value = userInfo
    shopConfig.value = userInfo.shops_settings
  }
  return { user, shopConfig, storeUserInfo }
})
