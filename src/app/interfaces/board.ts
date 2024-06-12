import { User } from "@app/auth/interfaces/user";

export interface Board {
  id: string;
  title: string;
  backgroundColor: 'sky' | 'yellow' | 'green' | 'red' | 'violet' | 'gray';
  members: User[]
}
