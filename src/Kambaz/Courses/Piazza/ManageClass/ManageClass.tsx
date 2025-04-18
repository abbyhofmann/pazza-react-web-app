import { Navigate, Route, Routes } from "react-router-dom";
import ManageClassTab from "./ManageClassTab";
import ManageFolders from "./ManageFolders";
import "./ManageClass.css";
import GeneralSettings from "./GeneralSettings";
import CustomizeQA from "./CustomizeQA";
import ManageEnrollment from "./ManageEnrollment";
import CreateGroups from "./CreateGroups";
import CustomizeCoursePage from "./CustomizeCoursePage";
import PiazzaNetworkSettings from "./PiazzaNetworkSettings";

export default function ManageClassScreen() {
  return (
    <div>
      <hr />
      <ManageClassTab />
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="Manage-Folders" />} />
          <Route path="/General-Settings/*" element={<GeneralSettings />} />
          <Route path="/Customize-Q&A/*" element={<CustomizeQA />} />
          <Route path="/Manage-Folders/*" element={<ManageFolders />} />
          <Route path="/Manage-Enrollment/*" element={<ManageEnrollment />} />
          <Route path="/Create-Groups/*" element={<CreateGroups />} />
          <Route path="/Customize-Course-Page/*" element={<CustomizeCoursePage />} />
          <Route path="/Piazza-Network-Settings/*" element={<PiazzaNetworkSettings />} />
        </Routes>
      </div>
    </div >
  )
}