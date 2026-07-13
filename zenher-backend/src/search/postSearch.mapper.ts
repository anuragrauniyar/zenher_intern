import { Post } from "@prisma/client";
import { PostSearchDocument } from "./postSearch.types.js";

export const toPostSearchDocument = (post: Post): PostSearchDocument => {
  return {
    id: post.id,
    title: post.title,
    content: post.content,
    category: post.category,
    createdAt: post.createdAt.getTime(),
  };
};