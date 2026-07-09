import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../services/postApi';

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'], 
    queryFn: fetchPosts,
  });
};