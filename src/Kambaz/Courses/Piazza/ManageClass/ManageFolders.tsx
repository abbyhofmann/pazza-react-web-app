import { useState } from "react";
import FolderSelector from "./FolderSelector";
import useFolders from "../hooks/useFolders";

export default function ManageFolders() {
  const [folderName, setFolderName] = useState<string>("");
  const { addFolder } = useFolders();

  return (
    <div id="manage_box" className="d-flex flex-column gap-3">
      <hr style={{ border: "3px solid black" }} />

      {/* Header */}
      <div className="d-flex flex-column">
        <h2 className="fw-bold">Configure Class Folders</h2>
        <hr />
        <p>Folders allow you to keep class content organized. When students and instructors add a new post, they will be required to specify at least one folder for their post.</p>
      </div>

      {/* Create new folders */}
      <div className="d-flex flex-column">
        <h3 className="fw-bold">Create new folders:</h3>
        <p>Add folders that are relevant for your class.</p>
        <div className="d-flex flex-row justify-content-between">
          <input className="w-auto" placeholder="Add a folder(s)" onChange={(e) => setFolderName(e.target.value)} />
          <button className="blue_button" onClick={() => addFolder(folderName)}>Add folder</button>
        </div>
      </div>

      {/* Manage folders */}
      <div className="d-flex flex-column">
        <FolderSelector />
      </div>
    </div>
  )
}