import { FileHandler } from './FileHandler';

export interface User {
  id: string | null;
  username: string;
  email: string;
  password: string;
  profilePic: FileHandler | null;
}