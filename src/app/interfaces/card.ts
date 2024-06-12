import { List } from "./list"

export interface Card {
  id: string
  title: string
  description: string
  position: number
  list: List
}
