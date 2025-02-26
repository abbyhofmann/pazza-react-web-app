import { FaPencil } from "react-icons/fa6";
import { folders } from "../../../Database";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { FaBars, FaSave } from "react-icons/fa";

export default function FolderSelector() {
  return (
    <div className="d-flex flex-column">
      {folders.map((folder, index) => (
        <div key={index} className="d-flex row justify-space-center">
          <Folder name={folder.name} />
        </div>
      ))}
    </div>
  );
}

interface Props {
  name: string;
}

const Folder = ({ name }: Props) => {
  const [selected, setSelected] = useState(true);
  return (
    <div className="d-flex">
      <Form.Check type="checkbox" />
      <div className="px-2">
        <FaBars />
      </div>
      {selected &&
        <div className="d-flex">
          <div className="folder-selector-name px-2">
            {name}
          </div>
          <button className="manage_folders_button px-4 mx-4 float-end" onClick={() => setSelected(!(selected))}>
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