export interface IEntities {
  confirmation_url: string
}

export interface IOrderResponse {
  entities: IEntities
  meta: any[]
  message: string
}
