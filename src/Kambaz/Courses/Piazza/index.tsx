import { Route, Routes } from "react-router-dom";
import RightSidePage from "./RightSidePage";
import NewPostPage from "./NewPost";
import PiazzaNavBarTop from "./PiazzaNavBarTop";
import NoteQuestionSidebar from "./PostSidebar";
import ManageClassScreen from "./ManageClass/ManageClass";
import ViewPostPage from "./ViewPostPage";
import "./index.css";

export default function Piazza() {
  return (
    <div id="wd-piazza">
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
      </div>
    </div>
  );
}
