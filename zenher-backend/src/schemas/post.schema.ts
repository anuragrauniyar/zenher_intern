import { z } from 'zod';
import { Category } from '@prisma/client';

// Keep the single source of truth by using Prisma's generated Enum
const CategoryEnum = z.nativeEnum(Category);

export const createPostSchema = z.object({
  body: z.object({
    title: z.string().min(10, "Title must be at least 10 characters").max(120),
    content: z.string().min(30, "Content must be at least 30 characters").max(5000),
    category: CategoryEnum,
    author: z.string().min(1, "Author is required").max(100),
  }),
});