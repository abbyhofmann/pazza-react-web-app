import { FaPencil } from "react-icons/fa6";
import { folders } from "../../../Database";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { FaBars, FaSave, FaTrash } from "react-icons/fa";

interface Props {
  name: string;
}

export default function FolderSelector() {
  const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
  const [editing, setEditing] = useState(false);

  const Folder = ({ name }: Props) => {
    const [selected, setSelected] = useState(true);

    // TODO: figure out how to float-end and float-start
    return (
      <div className="d-flex">
        <Form.Check type="checkbox"
          checked={selectedFolders.includes(name)}
          onChange={() => {
            setSelectedFolders(prev =>
              prev.includes(name)
                ? prev.filter(f => f !== name)
                : [...prev, name]
            );
          }} />
        <div className="px-2">
          <FaBars />
        </div>
        {selected &&
          <div className="d-flex">
            <div className="folder-selector-name px-2">
              {name}
            </div>
            <button className="manage_folders_button px-4 mx-4 float-end" onClick={() => {
              setSelected(!(selected));
              setEditing(true);
            }}>
              <FaPencil />
              Edit
            </button>
          </div>
        }
        {!selected &&
          <div className="d-flex">
            <input placeholder={name} />
            <button className="manage_folders_button px-4 mx-4" onClick={() => setSelected(!(selected))}>
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
        <button className="manage_folders_button" disabled={selectedFolders.length === 0 && !editing}>
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