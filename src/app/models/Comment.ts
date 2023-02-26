import { Post } from "./Post";
import { User } from "./User";

export interface Comment {
  id: number | null;
  commentText: string;
  date: string;
  post: Post;
  user: User;
  
}