import { User } from "@app/auth/interfaces/user";

export interface Board {
  id: string;
  title: string;
  backgroundColor: string;
  members: User[]
}
