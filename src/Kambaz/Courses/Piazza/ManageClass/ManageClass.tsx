import { Navigate, Route, Routes } from "react-router-dom";
import ManageClassTab from "./ManageClassTab";
import ManageFolders from "./ManageFolders";

export default function ManageClassScreen() {
  return (
    <div>
      <hr />
      <ManageClassTab />
      <hr />
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="Manage-Folders" />} />
          <Route path="/Manage-Folders/*" element={<ManageFolders />} />
        </Routes>
      </div>
    </div >
  )
}