import { Route, Routes, useLocation } from "react-router-dom";
import PiazzaNavBarTop from "./PiazzaNavBarTop";
import HwFolderNav from "./HwFolderNav";


import ManageClassScreen from "./ManageClass/ManageClass";
import ViewPostPage from "./ViewPost/ViewPostPage/ViewPostPage";
import NoteQuestionSidebar from "./PostSidebar/PostSidebar";
import "./index.css";
import NewPostPage from "./NewPost";
import RightSidePage from "./RightSidePage";
import { PostSidebarProvider } from "./PostSidebarContext";

const SideBar = () => {
  const location = useLocation();
  if (location.pathname.includes("Manage-Class")
    || location.pathname.includes("manage-class")) {
    return <></>;
  }
  return <NoteQuestionSidebar />;

}

const FolderNav = () => {
  const location = useLocation();
  if (location.pathname.includes("Manage-Class")
    || location.pathname.includes("manage-class")) {
    return <></>;
  }
  return <HwFolderNav />;
}

export default function Piazza() {
  return (
    <div>
      <PostSidebarProvider>
        <PiazzaNavBarTop />
        <FolderNav />

        <div className="wd-layout">
          <SideBar />
          <div className="wd-main-content">
            <Routes>
              <Route path="/" element={<RightSidePage />} />
              <Route path="/NewPostPage" element={<NewPostPage />} />
              <Route path="/manage-class/*" element={<ManageClassScreen />} />
              <Route path="/post/:pid" element={<ViewPostPage />} />
            </Routes>
          </div>
        </div>
      </PostSidebarProvider>
    </div>
  );
}
