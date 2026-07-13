export const POST_INDEX_NAME = "posts";

export type PostSearchDocument = {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: number;
};