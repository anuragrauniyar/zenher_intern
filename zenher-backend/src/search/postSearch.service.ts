import { meilisearchClient } from '../config/meilisearch.js';
import { POST_INDEX_NAME, PostSearchDocument } from './postSearch.types.js';

export const searchPosts = async (query: string): Promise<PostSearchDocument[]> => {
  const index = meilisearchClient.index<PostSearchDocument>(POST_INDEX_NAME);
  const result = await index.search(query);
  return result.hits;
};