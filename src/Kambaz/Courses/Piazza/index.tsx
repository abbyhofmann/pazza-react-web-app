import { Route, Routes } from "react-router-dom";
import RightSidePage from "./RightSidePage";
import NewPostPage from "./NewPost";
import PiazzaNavBarTop from "./PiazzaNavBarTop";
import NoteQuestionSidebar from "./PostSidebar/PostSidebar";


import ManageClassScreen from "./ManageClass/ManageClass";
import ViewPostPage from "./ViewPost/ViewPostPage/ViewPostPage";
import "./index.css";
import CombinedPage from "./RightAndLeft";
import NewPostPage from "./NewPost";
import HwFolderNav from "./HwFolderNav";

export default function Piazza() {
  return (
    <div>
      <PiazzaNavBarTop />
      <HwFolderNav/>
      <div className="wd-layout">
        <NoteQuestionSidebar />
        <div className="wd-main-content">
          <Routes>
            <Route path="/" element={<RightSidePage />} />
            <Route path="/NewPostPage" element={<NewPostPage />} />
            <Route path="/manage-class/*" element={<ManageClassScreen />} />
            <Route path="/post/:pid" element={<ViewPostPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
