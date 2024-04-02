export interface ProductResponse {
  entities: ProductResponseEntities[]
  meta: ProductResponseMeta
}
export interface ProductResponseEntitiesMediaGenerated_conversions {
  preview: boolean
}
export interface ProductResponseEntitiesMedia {
  id: number
  model_type: string
  model_id: number
  uuid: string
  collection_name: string
  name: string
  file_name: string
  mime_type: string
  disk: string
  conversions_disk: string
  size: number
  manipulations: any[]
  custom_properties: any[]
  generated_conversions: ProductResponseEntitiesMediaGenerated_conversions
  responsive_images: any[]
  order_column: number
  created_at: string
  updated_at: string
  original_url: string
  preview_url: string
}
export interface ProductResponseEntities {
  id: number
  description?: string
  name: string
  price: number
  media: ProductResponseEntitiesMedia[]
  preview: string
  stock: number | null
  basketCount?: number | null
  isAnimatingProcess?: boolean
  animationTimeoutId?: number | null
}
export interface ProductResponseMetaLinks {
  url?: any
  label: string
  active: boolean
}
export interface ProductResponseMeta {
  current_page: number
  per_page: number
  last_page: number
  from: number
  to: number
  total: number
  prev_page_url?: any
  next_page_url: string
  links: ProductResponseMetaLinks[]
}

export interface BasketProduct {
  product_id: number
  count: number
}
export interface Basket {
  basket: BasketProduct[]
}
