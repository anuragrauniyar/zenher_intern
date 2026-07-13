import { prisma } from '../config/database.js';
import { CreatePostDto } from '../dto/post.dto.js';
import { logger } from '../utils/logger.js';
import { AppError } from '../utils/AppError.js';
import { processSearchQuery, normalizeQuery, calculateRelevanceScore, rankPosts } from '../utils/search.js';
import { indexPost } from '../search/postSearch.indexer.js';
import { searchPosts } from '../search/postSearch.service.js'

export class PostService {
  async createPost(dto: CreatePostDto) {
    logger.info('Processing new community post', { title: dto.title });
    
    const post = await prisma.post.create({
      data: dto,
    });

    try {
      await indexPost(post);
    } catch (error) {
      logger.error(`[Search Sync Error] Failed to index post ${post.id}`, { error });
    }

    return post;
  }

  async getPosts(searchQuery?: string) {
    const trimmedQuery = searchQuery?.trim();

    // 1. Normal Feed (No Query) -> PostgreSQL
    if (!trimmedQuery) {
      const posts = await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
      });
      // We must map it to strings so the API output is identical to Meilisearch
      return posts.map(post => ({
        ...post,
        createdAt: post.createdAt.toISOString()
      }));
    }

    // 2. Search Request -> Try Meilisearch
    try {
      const meiliHits = await searchPosts(trimmedQuery);
      
      return meiliHits.map(hit => ({
        id: hit.id,
        title: hit.title,
        content: hit.content,
        category: hit.category,
        createdAt: new Date(hit.createdAt).toISOString() // Convert back to ISO string
      }));
    } catch (error) {
      logger.error(`[Search Fallback] Meilisearch failed for query "${trimmedQuery}". Falling back to V2.`, { error });
      return await this.searchPostsV2Fallback(trimmedQuery);
    }
  }

  // 3. Fallback logic (This is your old V2 code, safely tucked away)
  private async searchPostsV2Fallback(query: string) {
    const normalizedQuery = normalizeQuery(query);
    const terms = processSearchQuery(query);

    if (terms.length === 0) return [];

    const conditions = terms.flatMap((term) => [
      { title: { contains: term, mode: 'insensitive' as const } },
      { content: { contains: term, mode: 'insensitive' as const } },
    ]);

    const candidates = await prisma.post.findMany({
      where: { OR: conditions },
    });

    const scoredPosts = candidates.map((post) => ({
      post,
      score: calculateRelevanceScore(post, normalizedQuery, terms),
    }));

    const rankedPosts = rankPosts(scoredPosts);
    return rankedPosts.map(({ post }) => ({
        ...post,
        createdAt: post.createdAt.toISOString()
    }));
  }
}

export const postService = new PostService();