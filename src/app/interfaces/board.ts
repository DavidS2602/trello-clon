import { User } from "@app/auth/interfaces/user";
import { List } from "./list";
import { Card } from "./card";

export interface Board {
  id: string;
  title: string;
  backgroundColor: 'sky' | 'yellow' | 'green' | 'red' | 'violet' | 'gray';
  members: User[]
  lists: List[]
  cards: Card[]
}
