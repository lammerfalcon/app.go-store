export interface CategoriesResponse {
  entities: CategoriesResponseEntities[]
  meta: any[]
  message: string
}
export interface CategoriesResponseEntities {
  id: number | null
  name: string
}
