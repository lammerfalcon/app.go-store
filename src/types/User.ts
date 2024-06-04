export interface IShopSettings {
  yookassa?: IYookassa
  card?: ICard
  bank?: string
  shop_name: string
  payment_type: PaymentType
  greeting_text: string
}
export type PaymentType = 'card' | 'yookassa'
export interface IUser {
  id: number
  name: string
  shops_settings: IShopSettings
}

export interface Entities {
  user: IUser
}

export interface IUserResponse {
  entities: Entities
  meta: any[]
  message: string
}

export interface IYookassa {
  shop_id: string
  secret_key: string
}
export interface ICard {
  holder: string
  number: string
}
