import { z } from "zod";

export const CategorySchema = z.enum([
  "Hormones",
  "Maternal Health",
  "Period Health",
  "Nutrition",
  "Mental Health",
  "General",
]);

// This is the schema for the raw form data submitted by the user
export const CreatePostFormSchema = z.object({
  title: z
    .string()
    .min(10, "Title must be at least 10 characters")
    .max(120, "Title cannot exceed 120 characters"),
  category: CategorySchema,
  content: z
    .string()
    .min(30, "Experience must be at least 30 characters")
    .max(5000, "Experience cannot exceed 5000 characters"),
});

// The full database entity
export const PostSchema = CreatePostFormSchema.extend({
  id: z.string().uuid(),
  author: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Category = z.infer<typeof CategorySchema>;
export type Post = z.infer<typeof PostSchema>;