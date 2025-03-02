
import { Route, Routes } from "react-router-dom";
import RightSidePage from "./RightSidePage";
import NewPostPage from "./NewPost";
import PiazzaNavBarTop from "./PiazzaNavBarTop";
import HwFolderNav from "./HwFolderNav";
import NoteQuestionSidebar from "./PostSidebar";
import ManageClassScreen from "./ManageClass/ManageClass";
import ViewPostPage from "./ViewPostPage";
import "./index.css";

export default function Piazza() {
  return (
    <div id="wd-piazza">
      <PiazzaNavBarTop />
      <HwFolderNav />
      <NoteQuestionSidebar />
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<RightSidePage />} />
          <Route path="/NewPostPage" element={<NewPostPage />} />
          <Route path="/manage-class/*" element={<ManageClassScreen />} />
          <Route path="post/:pid" element={<ViewPostPage />} />
        </Routes>
      </div>
    </div>
  );
}