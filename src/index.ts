import { PostsService } from "./modules/posts";
import { PostsRepository } from "./modules/posts/repository";
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const client = {
  _postsServiceInstance: null as PostsService | null,

  /** Create posts service using singleton pattern.
   *
   * @param apiBaseUrl REST API base URL.
   * @returns {PostsService} Post service for interacting with posts API.
   */
  postsService(apiBaseUrl: string | undefined) {
    if (!this._postsServiceInstance) {
      const postsRepository: PostsRepository = new PostsRepository(apiBaseUrl);
      this._postsServiceInstance = new PostsService(postsRepository);
    }
    return this._postsServiceInstance;
  },
};

export default client;
