import { Post } from "./../../../types.tsx";
import api from "./api.ts";

// we are using VITE, so import.meta.env is used instead of process.env for importing environment variables
const POST_API_URL = `${import.meta.env.VITE_API_URL}/post`;

/**
 * Gets a post by its ID.
 *
 * @param pid The ID of the post to fetch.
 * @throws Error if there is an issue fetching the post by ID.
 */
const getPostById = async (pid: string): Promise<Post> => {
  const res = await api.get(`${POST_API_URL}/${pid}`);

  if (res.status !== 200) {
    throw new Error("Error while fetching post");
  }
  return res.data;
};

const getPosts = async (): Promise<Post[]> => {
  const res = await api.get(`${POST_API_URL}/posts`);
  if (res.status !== 200) {
    throw new Error("Error while fetching posts");
  }
  return res.data;
};

const addDiscussionToPost = async (pid: string, fudId: string): Promise<Post> => {
  const data = { pid, fudId };
  const res = await api.post(`${POST_API_URL}/addDiscussion`, data);
  if (res.status !== 200) {
    throw new Error("Error while adding discussion to post");
  }
  return res.data;
}

export { getPostById, getPosts, addDiscussionToPost };
