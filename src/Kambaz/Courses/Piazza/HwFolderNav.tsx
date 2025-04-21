import { FaFolder } from "react-icons/fa";
import "./hwFolderNav.css";
import useFolders from "./hooks/useFolders";
import usePostSidebar from "./hooks/usePostSidebar";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getPostsInCourse, getPostsInFolder } from "./services/postService";
import { FaXmark } from "react-icons/fa6";

export default function HwFolderNav() {

  const { cid } = useParams();
  const { folders } = useFolders();
  const { setPosts } = usePostSidebar();
  const [filterBy, setFilterBy] = useState("");

  const filterByFolder = async (folderName: string) => {
    if (filterBy === "") {
      const allPosts = await getPostsInCourse(cid ?? "");
      setPosts(allPosts);
    } else {
      const filteredPosts = await getPostsInFolder(cid ?? "", folderName);
      setPosts(filteredPosts);
    }
  }

  useEffect(() => {
    filterByFolder(filterBy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterBy])

  const FilterByComponent = () => {
    if (filterBy == "") {
      return <></>;
    } else {
      return <div className="wd-filter-chip">
        <FaXmark onClick={() => setFilterBy("")} />
        {filterBy}
      </div>;
    }
  }

  return (

    <div className="wd-hw-folder-nav-bar">
      <div id="wd-hw-nav" className="d-flex align-items-start">

        <div className="d-flex wd-hw-height me-3">
          <FaFolder className="fs-5 me-2" />
          LIVE Q&A
        </div>


        <div className="d-flex wd-hw-height">
          <FaFolder className="fs-5 me-2" />
          Drafts
        </div>

        <div className="d-flex wd-hw-height">
          <FilterByComponent />
        </div>

        <div className="d-flex wd-hw-height">
          <FaFolder className="fs-5 me-2 ms-2 folders-icon" />
        </div>

        {folders.map((folder, index) =>
          <div
            key={index}
            className="d-flex wd-folder-height cursor-pointer"
            onClick={() => setFilterBy(folder.name)}
          >
            {folder.name}
          </div>
        )}
      </div>
    </div>
  )
}