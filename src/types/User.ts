export interface IShopSettings {
  bank: string
  shop_name: string
  card_holder: string
  card_number: string
  greeting_text: string
}

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
