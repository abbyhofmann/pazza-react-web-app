import { Folder, Post } from "./../../../types.tsx";
import api from "./api.ts";

// we are using VITE, so import.meta.env is used instead of process.env for importing environment variables
const FOLDERS_API_URL = `${import.meta.env.VITE_API_URL}/folders`;

const getFolders = async (courseId: string): Promise<Folder[]> => {
  const res = await api.get(`${FOLDERS_API_URL}/${courseId}`);
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
};

const getPostsInFolder = async (courseId: string, folderName: string): Promise<Post[]> => {
  const res = await api.get(`${FOLDERS_API_URL}/posts`, { params: { cid: courseId, name: folderName } });
  if (res.status !== 200) {
    throw new Error(res.statusText);
  }
  return res.data;
}

const createFolder = async (courseId: string, folderName: string): Promise<Folder> => {
  const res = await api.post(`${FOLDERS_API_URL}`, { folder: { courseId, name: folderName } });
  if (res.status != 200) {
    throw new Error(res.statusText);
  } else {
    return res.data;
  }
}

const deleteFolders = async (folders: { cid: string; name: string; }[]): Promise<Folder[]> => {
  const res = await api.delete(`${FOLDERS_API_URL}`, { data: folders });
  if (res.status != 200) {
    throw new Error(res.statusText);
  } else {
    return res.data;
  }
}

const editFolder = async (courseId: string, oldName: string, newName: string) => {
  const res = await api.put(`${FOLDERS_API_URL}`, { oldName: oldName, newName: newName, course: courseId });
  if (res.status != 200) {
    throw new Error(res.statusText);
  } else {
    return res.data;
  }
}

export { getFolders, getPostsInFolder, createFolder, deleteFolders, editFolder };
