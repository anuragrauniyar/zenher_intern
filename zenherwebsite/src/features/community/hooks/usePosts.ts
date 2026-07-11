import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../services/postApi';

export const usePosts = (query: string = "") => {
  return useQuery({
    queryKey: ["posts", { query }],
    queryFn: () => fetchPosts(query),
  });
};