import { FileHandler } from "./FileHandler";
import { User } from "./User";

export interface Post {
  user: User| null;
  id: number | null;
  title: string;
  likes: number;
  date: Date;
  content: string;
  image: FileHandler[];
}