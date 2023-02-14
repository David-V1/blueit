import { FileHandler } from "./FileHandler";

export interface Post {
  id: number | null;
  title: string;
  likes: number;
  date: Date;
  content: string;
  image: FileHandler[];
}