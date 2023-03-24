import { FileHandler } from './FileHandler';


export interface Community {
  id: number | null;
  name: string;
  dateCreated: string;
  description: string;
  logo: FileHandler;
  admin: string;
}
