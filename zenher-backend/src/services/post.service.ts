import { prisma } from '../config/database.js';
import { CreatePostDto } from '../dto/post.dto.js';
import { logger } from '../utils/logger.js';
import { AppError } from '../utils/AppError.js';

export class PostService {
  async createPost(dto: CreatePostDto) {
    logger.info('Processing new community post', { title: dto.title });
    
    return await prisma.post.create({
      data: dto,
    });
  }

  async getPosts() {
    return await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getPostById(id: string) {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) throw new AppError("Post not found", 404);
    return post;
  }

}

export const postService = new PostService();