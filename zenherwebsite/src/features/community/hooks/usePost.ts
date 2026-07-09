import { useQuery } from '@tanstack/react-query';
import { fetchPostById } from '../services/postApi';

export const usePost = (postId: string) => {
  return useQuery({
    queryKey: ['posts', postId], // Crucial: keys by ID to prevent cache collisions
    queryFn: () => fetchPostById(postId),
  });
};