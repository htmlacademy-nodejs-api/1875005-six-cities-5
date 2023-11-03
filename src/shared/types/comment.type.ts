import { User } from './user.type.js';

export type Comment = {
  comment: string; // 5-1024 symbols
  date: string; // Obligatory, not used for add comment
  rating: number; // Obligatory, from 1 to 5
  user: User; // Obligatory
  }

