import { FaFolder } from "react-icons/fa";
import "./hwFolderNav.css";
import useFolders from "./hooks/useFolders";

export default function HwFolderNav() {

  const { folders } = useFolders();

  return (

    <div className="wd-hw-folder-nav-bar">
      <div id="wd-hw-nav" className="d-flex align-items-start">

        <div className="d-flex wd-hw-height me-3 wd-margin-top">
          <FaFolder className="fs-5 me-2" />
          LIVE Q&A
        </div>


        <div className="d-flex wd-hw-height vertical-line">
          <FaFolder className="fs-5 me-2" />
          Drafts
        </div>

        <div className="d-flex wd-hw-height ms-3 vertical-line">
          <FaFolder className="fs-5 me-2 ms-2 folders-icon" />
        </div>

        {folders.map((folder, index) =>
          <div key={index} className="d-flex wd-folder-height wd-margin-top">{folder.name}</div>)}
         
      </div>
    </div>
  )
}