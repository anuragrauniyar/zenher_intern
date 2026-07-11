import { Request, Response } from 'express';
import { postService } from '../services/post.service.js';
import { createPostSchema } from '../schemas/post.schema.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { logger } from '../utils/logger.js';

export class PostController {
  createPost = asyncHandler(async (req: Request, res: Response) => {
    const validationResult = createPostSchema.safeParse({ body: req.body });
    
    if (!validationResult.success) {
      logger.warn('Post validation failed');
      return sendError(res, 400, 'Validation failed', validationResult.error.flatten().fieldErrors);
    }

    const post = await postService.createPost(validationResult.data.body);
    
    return sendSuccess(res, 201, 'Post created successfully', post);
  });

  getPosts = asyncHandler(async (req: Request, res: Response) => {
    const query = req.query.query as string | undefined;
    const posts = await postService.getPosts(query);
    return sendSuccess(res, 200, 'Posts fetched successfully', posts);
  });

  getPostById = asyncHandler(async (req: Request, res: Response) => {
    console.log("CRITICAL DEBUG - Requested ID is:", req.params.id); // ADD THIS
    const post = await postService.getPostById(req.params.id);
    return sendSuccess(res, 200, 'Post fetched successfully', post);
  });

}

export const postController = new PostController();