import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title cannot exceed 100 characters"),
  content: z.string().min(1, "Content is required"),
  author: z.string().min(1, "Author name is required"),
  category: z.string().min(1, "Category is required")
});

// This exports the TypeScript type inferred directly from the Zod schema
export type CreatePostInput = z.infer<typeof createPostSchema>;