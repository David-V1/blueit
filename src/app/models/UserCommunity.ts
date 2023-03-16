import { User } from './User';
import { Community } from './Community';

export interface UserCommunity {
    id: number;
    user: User;
    community: Community;
    dateJoined: string;
}