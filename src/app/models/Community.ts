import { FileHandler } from './FileHandler';
import { Post } from './Post';
import { User } from './User';

export interface Community {
  id: number | null;
  name: string;
  dateCreated: string;
  description: string;
  logo: FileHandler | null;
  members: User[];
}
