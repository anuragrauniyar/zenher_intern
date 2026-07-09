import { Category } from '@prisma/client';

export interface CreatePostDto {
  title: string;
  content: string;
  category: Category;
  author: string;
}