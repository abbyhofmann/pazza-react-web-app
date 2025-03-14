import { Route, Routes } from "react-router-dom";
import RightSidePage from "./RightSidePage";
import NewPostPage from "./NewPost";
import PiazzaNavBarTop from "./PiazzaNavBarTop";
import NoteQuestionSidebar from "./PostSidebar/PostSidebar";
import ManageClassScreen from "./ManageClass/ManageClass";
import ViewPostPage from "./ViewPost/ViewPostPage/ViewPostPage";
import "./index.css";
import PiazzaNavBarTop from "./PiazzaNavBarTop";
import HwFolderNav from "./HwFolderNav";
import CombinedPage from "./RightAndLeft";
import NewPostPage from "./NewPost";

export default function Piazza() {
  return (
    <div>
      <PiazzaNavBarTop />
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

      <HwFolderNav />
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<CombinedPage/>} />
          <Route path="NewPostPage" element={<NewPostPage/>} />

        </Routes>
      </div>
    </div>
  );
}
