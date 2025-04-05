import { Folder, Post } from "./../../../types.tsx";
import api from "./api.ts";

// we are using VITE, so import.meta.env is used instead of process.env for importing environment variables
const FOLDERS_API_URL = `${import.meta.env.VITE_API_URL}/folders`;

/**
 * Gets a post by its ID.
 *
 * @param pid The ID of the post to fetch.
 * @throws Error if there is an issue fetching the post by ID.
 */
// const getPostById = async (pid: string): Promise<Post> => {
//   const res = await api.get(`${POST_API_URL}/${pid}`);

//   if (res.status !== 200) {
//     throw new Error("Error while fetching post");
//   }
//   return res.data;
// };

/**
 * Get the folders of a course
 * @param courseId the course ID to fetch folders for
 * @returns list of folders for a course
 */
const getFolders = async (courseId: string): Promise<Folder[]> => {
  const res = await api.get(`${FOLDERS_API_URL}`, { params: { cid: courseId } });
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};

const getPostsInFolder = async (courseId: string, folder: string): Promise<Post[]> => {
  const res = await api.get(`${FOLDERS_API_URL}/posts`, { params: { cid: courseId, name: folder } });
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
}

export { getFolders, getPostsInFolder };
