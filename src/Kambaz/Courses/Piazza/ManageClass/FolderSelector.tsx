import { FaPencil } from "react-icons/fa6";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { FaBars, FaSave, FaTrash } from "react-icons/fa";
import useFolders from "../hooks/useFolders";

interface Props {
  name: string;
}

export default function FolderSelector() {
  const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
  const { folders, deleteFoldersHook, editFolderName } = useFolders();

  const Folder = ({ name }: Props) => {
    const [editing, setEditing] = useState(false);
    const [editedName, setEditedName] = useState<string>("");
    const editFolderOnClick = () => {
      if (editing) {
        // if we are currently editing, then we save the new folder name
        editFolderName(name, editedName);
      }
      // flip the editing state
      setEditing(!(editing));
    }

    const checkboxOnClick = (cb: React.ChangeEvent<HTMLInputElement>) => {
      if (!cb.target.checked) {
        // if checked, remove it and uncheck it
        setSelectedFolders(prev =>
          prev.includes(name)
            ? prev.filter(f => f !== name)
            : [...prev, name]
        );
      } else {
        // if unchecked, add it and check it
        setSelectedFolders([...selectedFolders, name]);
      }
    }

    return (
      <div className="d-flex">
        <Form.Check type="checkbox"
          checked={selectedFolders.includes(name)}
          onChange={checkboxOnClick} />
        <div className="px-2">
          <FaBars />
        </div>
        {!editing &&
          <div className="d-flex">
            <div className="folder-selector-name px-2">
              {name}
            </div>
            <button className="manage_folders_button px-4 mx-4 float-end" onClick={editFolderOnClick}>
              <FaPencil />
              Edit
            </button>
          </div>
        }
        {
          editing &&
          <div className="d-flex">
            <input placeholder={name} onChange={e => setEditedName(e.target.value)} />
            <button className="manage_folders_button px-4 mx-4" onClick={editFolderOnClick}>
              <FaSave />
              Save
            </button>
          </div>
        }
      </div>
    )
  }

  return (
    <div>
      <h3 className="fw-bold">Manage folders:</h3>
      <p>Delete or edit folder names. You can create up to 1 level of nesting, which means no subfolders.</p>
      <div className="d-flex">
        <button className="manage_folders_button" disabled={selectedFolders.length === 0}
          onClick={() => {
            deleteFoldersHook(selectedFolders);
          }}>
          <FaTrash />
          Delete selected folders
        </button>
      </div>
      <hr />
      <div className="d-flex flex-column gap-2">
        {folders.map((folder, index) => (
          <div key={index} className="d-flex flex-row justify-space-center">
            <Folder name={folder.name} />
          </div>
        ))}
      </div>
    </div>
  );
}