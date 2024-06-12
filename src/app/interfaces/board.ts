import { User } from "@app/auth/interfaces/user";
import { ToDo } from "src/models/todo.model";
import { List } from "./list";
import { Card } from "./card";

export interface Board {
  id: string;
  title: string;
  backgroundColor: 'sky' | 'yellow' | 'green' | 'red' | 'violet' | 'gray';
  members: User[]
  list: List[]
  cards: Card[]
}
