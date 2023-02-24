import { Post } from "./Post";
import { User } from "./User";

export interface Comment {
  id: number;
  commentText: string;
  commentDate: Date;
  user: User;
  post: Post;
}