import { useEffect, useState } from "react";
import { useParams } from "react-router"
import { Folder } from "../../../types";
import { getFolders, getPostsInFolder } from "../services/folderService";

const useFolders = () => {
  const { cid } = useParams();

  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    const fetchFolders = async () => {
      setFolders(await getFolders(cid ?? ""));
    }
    fetchFolders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchPosts = async (folder: string) => {
    return await getPostsInFolder(cid ?? "", folder);
  }

  return {
    folders,
    fetchPosts
  };
}

export default useFolders;