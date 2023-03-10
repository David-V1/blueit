import { FileHandler } from './FileHandler';
import { User } from './User';

export interface Community {
  id: number | null;
  name: string;
  dateCreated: string;
  description: string;
  logo: FileHandler;
  admin: string;
  members: User[]; // Number
}
