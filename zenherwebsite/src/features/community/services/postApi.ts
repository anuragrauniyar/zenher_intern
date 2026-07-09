import { ApiError } from '@/utils/ApiError';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchPosts = async () => {
  const response = await fetch(`${API_BASE_URL}/posts`);
  
  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    throw new ApiError(result.message || "Failed to fetch posts", response.status);
  }
  
  const result = await response.json();
  return result.data;
};

export const fetchPostById = async (postId: string) => {
  const response = await fetch(`${API_BASE_URL}/posts/${postId}`);
  
  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    throw new ApiError(result.message || "Failed to fetch post", response.status);
  }
  
  const result = await response.json();
  return result.data;
};

export const createPost = async (postData: any) => {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
  
  if (!response.ok) {
    const result = await response.json().catch(() => ({}));
    throw new ApiError(result.message || "Failed to create post", response.status);
  }
  
  const result = await response.json();
  return result.data;
};