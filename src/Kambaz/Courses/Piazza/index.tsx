
import { Navigate, Route, Routes } from "react-router-dom";
import RightSidePage from "./RightSidePage";
import NewPostPage from "./NewPost";
import PiazzaNavBarTop from "./PiazzaNavBarTop";
import HwFolderNav from "./HwFolderNav";
import NoteQuestionSidebar from "./PostSidebar";
import ViewPostPage from "./ViewPostPage";
import "./index.css";

export default function Piazza() {
  return (
    <div id="wd-piazza">
      <PiazzaNavBarTop />
      <HwFolderNav />
      <div className="wd-container">
        <NoteQuestionSidebar />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="RightSidePage" />} />
            <Route path="RightSidePage" element={<RightSidePage />} />
            <Route path="NewPostPage" element={<NewPostPage />} />
            {/* <Route path="viewPost" element={<ViewPostPage /> } /> TODO - this is temporary for testing UI */}
            <Route path="post/:pid" element={<ViewPostPage />} />

          </Routes>
        </div>
      </div>
    </div>
  );
}