import sdkClient from "../index";
import { PostsService } from "../modules/posts";
import { IPost } from "../modules/posts/entities";
import { PostsRepository } from "../modules/posts/repository";
import { ZodError } from "zod";

const TEST_POSTS: IPost[] = [
  {
    userId: 1,
    id: 1,
    title: "Foo",
    body: "Bar",
  },
];

let postsService: PostsService;
let mockRepository: jest.Mocked<PostsRepository>;

beforeEach(() => {
  mockRepository = {
    getPosts: jest.fn(),
    createPost: jest.fn(),
    updatePost: jest.fn(),
    deletePost: jest.fn(),
  } as unknown as jest.Mocked<PostsRepository>;
  postsService = new PostsService(mockRepository);
});

describe("Client", () => {
  it("Should create posts service successfully.", () => {
    const apiBaseUrl = process.env.API_BASE_URL;
    const postsService = sdkClient.postsService(apiBaseUrl);

    expect(postsService).toBeInstanceOf(PostsService);
    expect((postsService as any)._repository).toBeInstanceOf(PostsRepository);
  });

  it("Should return posts objects.", async () => {
    mockRepository.getPosts.mockResolvedValue(TEST_POSTS);

    const response: IPost[] = await postsService.getPosts();

    expect(response).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          userId: expect.any(Number),
          id: expect.any(Number),
          title: expect.any(String),
          body: expect.any(String),
        }),
      ])
    );
    expect(response.length).toBeGreaterThan(0);
    expect(mockRepository.getPosts).toHaveBeenCalledTimes(1);
  });

  it("Should create a post successfully.", async () => {
    const newPost: IPost = {
      userId: 1,
      title: "Foo",
      body: "This is a post content...",
    };

    mockRepository.createPost.mockResolvedValue(newPost);

    const response = await postsService.createPost(newPost);

    expect(response).toEqual(newPost);
    expect(mockRepository.createPost).toHaveBeenCalledTimes(1);
    expect(mockRepository.createPost).toHaveBeenCalledWith(newPost);
  });

  it("Should update a post successfully.", async () => {
    const updatedPost: IPost = {
      userId: 1,
      id: 1,
      title: "Foo",
      body: "This is an updated post",
    };

    mockRepository.updatePost.mockResolvedValue(updatedPost);

    const response = await postsService.updatePost(1, updatedPost);

    expect(response).toEqual(updatedPost);
    expect(mockRepository.updatePost).toHaveBeenCalledTimes(1);
    expect(mockRepository.updatePost).toHaveBeenCalledWith(1, updatedPost);
  });

  it("Should delete a post successfully.", async () => {
    mockRepository.deletePost.mockResolvedValue(undefined);

    await postsService.deletePost(1);

    expect(mockRepository.deletePost).toHaveBeenCalledTimes(1);
    expect(mockRepository.deletePost).toHaveBeenCalledWith(1);
  });

  it("Should throw error if create post has missing fields.", async () => {
    const invalidPost: IPost = {
      userId: 1,
      id: 2,
      title: "",
      body: "This is a post content...",
    };

    await expect(postsService.createPost(invalidPost)).rejects.toThrow(
      ZodError
    );
    expect(mockRepository.createPost).not.toHaveBeenCalled();
  });

  it("Should throw error if the post to be updated has invalid fields.", async () => {
    const invalidPost: IPost = {
      userId: 1,
      id: 1,
      title: "",
      body: "This is an updated post",
    };

    await expect(postsService.updatePost(1, invalidPost)).rejects.toThrow(
      ZodError
    );
    expect(mockRepository.updatePost).not.toHaveBeenCalled();
  });
});
