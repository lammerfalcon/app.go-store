import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { IShopSettings, IUser, PaymentType } from '@/types/User'

export const useUserStore = defineStore('user', () => {
  const user = ref<IUser>()
  const shopConfig = ref<IShopSettings>()
  const paymentType = ref<PaymentType>()
  function storeUserInfo(userInfo: IUser) {
    user.value = userInfo
    shopConfig.value = userInfo.shops_settings
    paymentType.value = userInfo.shops_settings.payment_type
  }
  return { user, shopConfig, storeUserInfo, paymentType }
})
