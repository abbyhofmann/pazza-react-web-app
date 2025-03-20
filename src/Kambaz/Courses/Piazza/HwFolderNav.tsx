import { FaFolder } from "react-icons/fa";
import "./hwFolderNav.css";

export default function HwFolderNav() {

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
          <FaFolder className="fs-5 me-2 ms-2 folders-icon" />
        </div>

        <div className="d-flex wd-folder-height">
          hw1
        </div>
        <div className="d-flex wd-hw-height">
          hw2
        </div>
        <div className="d-flex wd-hw-height">
          hw3
        </div>
        <div className="d-flex wd-hw-height">
          hw4
        </div>
      </div>
    </div>
  )
}