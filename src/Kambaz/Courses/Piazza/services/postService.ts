import { Post } from "./../../../types.tsx";
import api from "./api.ts";

const POST_API_URL = `${process.env.DB_CONN_STRING}/post`;


/**
 * Gets a post by its ID.
 *
 * @param pid The ID of the post to fetch.
 * @throws Error if there is an issue fetching the post by ID.
 */
const getPostById = async (pid: string): Promise<Post> => {
  const res = await api.get(`${POST_API_URL}/getPost/${pid}`);

  if (res.status !== 200) {
    throw new Error('Error while fetching post');
  }
  return res.data;
};



export { getPostById };
