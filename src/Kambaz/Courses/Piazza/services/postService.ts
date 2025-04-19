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

/**
 * Gets all the posts in the database.
 *
 * @returns The posts in the database.
 */
const getPosts = async (): Promise<Post[]> => {
  const res = await api.get(`${POST_API_URL}/posts`);
  if (res.status !== 200) {
    throw new Error("Error while fetching posts");
  }
  return res.data;
};

/**
 * Adds a followup discussion id to a post's list of followup discussion ids.
 *
 * @param pid The post to which the followup discussion id is being added.
 * @param fudId The id of the followup discussion.
 * @returns The updated post object with the followup discussion id added to the post's list of ids.
 */
const addDiscussionToPost = async (
  pid: string,
  fudId: string
): Promise<Post> => {
  const data = { pid, fudId };
  const res = await api.put(`${POST_API_URL}/addDiscussion`, data);

  if (res.status !== 200) {
    throw new Error("Error while adding discussion to post");
  }
  return res.data;
};

/**
 * Adds an answer id to a post's student or instructor answer attribute.
 *
 * @param pid The id of the post to which the answer is being added.
 * @param aid The id of the answer being added.
 * @param type The type of answer (either student or instructor).
 * @returns The updated post object with the answer id set.
 */
const addAnswerToPost = async (
  pid: string,
  aid: string,
  type: string
): Promise<Post> => {
  const data = { pid, aid, type };
  const res = await api.put(`${POST_API_URL}/addAnswer`, data);

  if (res.status !== 200) {
    throw new Error(`Error while adding ${type} answer to post`);
  }
  return res.data;
};

/**
 * Removes an answer (sets the answer field value to null) from a post following the answer's deletion.
 * @param pid The id of the post from which to remove the answer.
 * @param aid The id of the answer being removed.
 * @param type The type of post (student or instructor);
 * @returns The post object with the answer removed.
 */
const removeAnswerFromPost = async (
  pid: string,
  aid: string,
  type: string
): Promise<Post> => {
  const data = { pid, aid, type };
  const res = await api.put(`${POST_API_URL}/removeAnswer`, data);

  if (res.status !== 200) {
    throw new Error("Error while removing answer from post");
  }
  return res.data;
};

/**
 * Removes a followup discussion from a post's array of fuds.
 * @param pid The id of the post from which to remove the fud.
 * @param fudId The id of the fud to remove.
 * @returns The updated post object with the fud removed from the array.
 */
const removeFudFromPost = async (pid: string, fudId: string): Promise<Post> => {
  const data = { pid, fudId };
  const res = await api.put(`${POST_API_URL}/removeFud`, data);

  if (res.status !== 200) {
    throw new Error("Error while removing fud from post");
  }
  return res.data;
};

/**
 * Adds a new post to the database.
 *
 * @param newPost The new post object being created.
 * @returns The new post object.
 */
const createPost = async (newPost: Post): Promise<Post> => {
  const res = await api.post(`${POST_API_URL}/createPost`, newPost);

  if (res.status !== 200) {
    throw new Error("Error while creating post");
  }
  return res.data;
};

/**
 * Deletes a post.
 * @param pid The id of the post to delete.
 * @returns boolean indicating the success of the deletion.
 */
const deletePost = async (pid: string): Promise<boolean> => {
  const res = await api.delete(`${POST_API_URL}/${pid}`);

  if (res.status !== 200) {
    throw new Error("Error while deleting post");
  }
  return res.data;
};

/**
 * Updates a post upon a user editing its content.
 *
 * @param pid The id of the post being updated.
 * @param newContent The updated content of the post.
 * @returns The updated post object.
 */
const updatePost = async (
  pid: string,
  newContent: string
): Promise<Post> => {
  const data = { pid, newContent };
  const res = await api.put(`${POST_API_URL}/updatePost`, data);

  if (res.status !== 200) {
    throw new Error("Error while updating post");
  }
  return res.data;
};

export {
  getPostById,
  getPosts,
  addDiscussionToPost,
  addAnswerToPost,
  removeAnswerFromPost,
  removeFudFromPost,
  createPost,
  deletePost,
  updatePost
};
