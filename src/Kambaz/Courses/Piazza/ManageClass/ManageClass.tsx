import { Navigate, Route, Routes } from "react-router-dom";
import ManageClassTab from "./ManageClassTab";
import ManageFolders from "./ManageFolders";
import "./ManageClass.css";

export default function ManageClassScreen() {
  return (
    <div>
      <hr />
      <ManageClassTab />
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="Manage-Folders" />} />
          <Route path="/Manage-Folders/*" element={<ManageFolders />} />
        </Routes>
      </div>
    </div >
  )
}