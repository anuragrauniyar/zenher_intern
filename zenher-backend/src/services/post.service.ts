import { prisma } from '../config/database.js';
import { CreatePostDto } from '../dto/post.dto.js';
import { logger } from '../utils/logger.js';
import { AppError } from '../utils/AppError.js';
import { processSearchQuery, normalizeQuery, calculateRelevanceScore, rankPosts } from '../utils/search.js';

export class PostService {
  async createPost(dto: CreatePostDto) {
    logger.info('Processing new community post', { title: dto.title });
    
    return await prisma.post.create({
      data: dto,
    });
  }

  async getPosts(searchQuery?: string) {
    if (!searchQuery?.trim()) {
      return await prisma.post.findMany({
        orderBy: { createdAt: 'desc' },
      });
    }

    const normalizedQuery = normalizeQuery(searchQuery);
    const terms = processSearchQuery(searchQuery);

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

    return rankedPosts.map(({ post }) => post);
  }

}

export const postService = new PostService();