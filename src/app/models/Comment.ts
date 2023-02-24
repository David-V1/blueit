import { Post } from "./Post";
import { User } from "./User";

export interface Comment {
  id: number | null;
  commentText: string;
  commentDate: null;
  post: Post;
  user: User;
  
}