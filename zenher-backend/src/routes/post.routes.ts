import { Router } from 'express';
import { postController } from '../controllers/post.controller.js';
import { validate } from '../middleware/validate.js';
import { createPostSchema } from '../validators/post.validator.js';
import { searchPostsSchema } from '../validators/post.validator.js'; 

const router = Router();

router.get('/', validate(searchPostsSchema, 'query'), postController.getPosts);
router.get('/:id', postController.getPostById);

router.post('/', validate(createPostSchema), postController.createPost);

export default router;