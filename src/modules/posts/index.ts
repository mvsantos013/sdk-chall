import { IPost } from "./entities";
import { PostsRepository } from "./repository";
import { z } from "zod";

const postSchema = z.object({
  userId: z.number().int(),
  id: z.number().int().optional(),
  title: z.string().min(1, "Title cannot be empty"),
  body: z.string().min(1, "Body cannot be empty"),
});

/**
 * PostsService class has methods related to posts. It's responsible for validating
 * input and applying business logic. The iteration with the API itself is handled by
 * the repository layer.
 */
export class PostsService {
  _repository: PostsRepository;

  constructor(repository: PostsRepository) {
    this._repository = repository;
  }

  /**
   * List posts from the repository.
   *
   * @returns {IPost[]} An array of post objects.
   */
  async getPosts(): Promise<IPost[]> {
    return this._repository.getPosts();
  }

  /**
   * Create a new post.
   *
   * @param {IPost} post Post to be created.
   * @returns {IPost} The created post.
   */
  async createPost(post: IPost): Promise<IPost> {
    const validatedPost = postSchema.omit({ id: true }).parse(post) as IPost;
    return this._repository.createPost(validatedPost);
  }

  /**
   * Update a post.
   *
   * @param {number} id The ID of the post to update.
   * @param {IPost} post The updated post.
   * @returns {IPost} The updated post.
   */
  async updatePost(id: number, post: IPost): Promise<IPost> {
    const validatedPost = postSchema.parse(post) as IPost;
    return this._repository.updatePost(id, validatedPost);
  }

  /**
   * Delete a post given its ID.
   *
   * @param {number} id The ID of the post to delete.
   * @returns {void}
   */
  async deletePost(id: number): Promise<void> {
    return this._repository.deletePost(id);
  }
}
