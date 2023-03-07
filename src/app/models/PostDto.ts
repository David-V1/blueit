import { Community } from "./Community";
import { Post } from "./Post";
import { User } from "./User";

export interface PostDto {
    post: Post;
    user: User;
    community: Community;
}