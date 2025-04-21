import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { Folder } from "../../../types";
import { getFolders, createFolder, deleteFolders, editFolder } from "../services/folderService";
import { getPostsInFolder } from "../services/postService";

const useFolders = () => {
  const { cid } = useParams();

  const [folders, setFolders] = useState<Folder[]>([]);

  const fetchFolders = async () => {
    setFolders(await getFolders(cid ?? ""));
  }

  useEffect(() => {
    fetchFolders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPostsInFolder = async (folder: string) => {
    try {
      return await getPostsInFolder(cid ?? "", folder);
    } catch (err) {
      console.error(`Error in use-hook while fetching posts: ${err}`);
    }
  }

  const addFolder = async (folderName: string) => {
    try {
      const resp = await createFolder(cid ?? "", folderName);
      await fetchFolders();
      return resp;
    } catch (err) {
      console.error(`Error in use-hook while adding folder: ${err}`);
    }
  }

  const deleteFoldersHook = async (folders: string[]) => {
    try {
      const normalised = folders.map((f) => ({ cid: cid ?? "", name: f }));
      const resp = await deleteFolders(normalised);
      await fetchFolders();
      return resp;
    } catch (err) {
      console.error(`Error in use-hook while deleting folder: ${err}`);
    }
  }

  const editFolderName = async (folderNameOld: string, folderNameNew: string) => {
    try {
      const resp = await editFolder(cid ?? "", folderNameOld, folderNameNew);
      await fetchFolders();
      return resp;
    } catch (err) {
      console.error(`Error in use-hook while editing folder: ${err}`);
    }
  }

  return {
    folders,
    fetchPostsInFolder,
    addFolder,
    deleteFoldersHook,
    editFolderName,
  };
}

export default useFolders;