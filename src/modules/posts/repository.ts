import axios from "axios";
import { IPost } from "./entities";

export class PostsRepository {
  _baseUrl: string;

  constructor(baseUrl: string | undefined) {
    if (typeof baseUrl !== "string")
      throw new Error(`Invalid type of base URL received ${baseUrl}`);
    this._baseUrl = baseUrl;
  }

  /** Fetches posts from the API.
   *
   * @returns {IPost[]} List of posts objects.
   */
  async getPosts(): Promise<IPost[]> {
    try {
      const response = await axios.get(`${this._baseUrl}/posts`);
      return response.data;
    } catch (error: any) {
      throw new Error(`Error fetching posts: ${error.message}`);
    }
  }

  /** Creates a new post.
   *
   * @param {IPost} post The post object to create.
   * @returns {IPost} The created post.
   */
  async createPost(post: IPost): Promise<IPost> {
    try {
      const response = await axios.post(`${this._baseUrl}/posts`, post);
      return response.data;
    } catch (error: any) {
      throw new Error(`Error creating post: ${error.message}`);
    }
  }

  /** Updates an existing post.
   *
   * @param {number} id The ID of the post to update.
   * @param {IPost} post The post object with updated data.
   * @returns {IPost} The updated post.
   */
  async updatePost(id: number, post: IPost): Promise<IPost> {
    try {
      const response = await axios.put(`${this._baseUrl}/posts/${id}`, post);
      return response.data;
    } catch (error: any) {
      throw new Error(`Error updating post: ${error.message}`);
    }
  }

  /** Deletes a post by its ID.
   *
   * @param {number} id The ID of the post to delete.
   * @returns {void}
   */
  async deletePost(id: number): Promise<void> {
    try {
      await axios.delete(`${this._baseUrl}/posts/${id}`);
    } catch (error: any) {
      throw new Error(`Error deleting post: ${error.message}`);
    }
  }
}
