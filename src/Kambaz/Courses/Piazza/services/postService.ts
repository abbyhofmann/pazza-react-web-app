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
 * Gets all the posts in a specific course.
 *
 * @param 
 * @returns The posts in the course.
 */
const getPostsInCourse = async (courseId: string): Promise<Post[]> => {
  const res = await api.get(`${POST_API_URL}/posts/course/${courseId}`);
  if (res.status !== 200) {
    throw new Error(`Error while fetching posts in a course: ${res.statusText}`);
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

export { getPostById, getPosts, getPostsInCourse, addDiscussionToPost, addAnswerToPost };
