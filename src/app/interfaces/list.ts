import { Card } from "./card"

export interface List {
  id: string,
  title: string,
  position: number
  cards: Card[]
}
