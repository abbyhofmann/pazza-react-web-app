import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { Folder } from "../../../types";
import { getFolders, getPostsInFolder, createFolder, deleteFolders, editFolder } from "../services/folderService";

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
    return await getPostsInFolder(cid ?? "", folder);
  }

  const addFolder = async (folderName: string) => {
    const resp = await createFolder(cid ?? "", folderName);
    await fetchFolders();
    return resp;
  }

  const deleteFoldersHook = async (folders: string[]) => {
    const normalised = folders.map((f) => ({ cid: cid ?? "", name: f }));
    const resp = await deleteFolders(normalised);
    await fetchFolders();
    return resp;
  }

  const editFolderName = async (folderNameOld: string, folderNameNew: string) => {
    const resp = await editFolder(cid ?? "", folderNameOld, folderNameNew);
    await fetchFolders();
    return resp;
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