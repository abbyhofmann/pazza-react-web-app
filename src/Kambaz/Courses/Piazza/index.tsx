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
import { useState } from "react";


type SideBarProps = {
  isFullScreen: boolean;
  setIsFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideBar = ({ isFullScreen, setIsFullScreen }: SideBarProps) => {
  const location = useLocation();
  if (location.pathname.includes("Manage-Class") || location.pathname.includes("manage-class")) {
    return <></>;
  }
  return (
    <NoteQuestionSidebar
      isFullScreen={isFullScreen}
      setIsFullScreen={setIsFullScreen}
    />
  );
};



const FolderNav = () => {
  const location = useLocation();
  if (location.pathname.includes("Manage-Class")
    || location.pathname.includes("manage-class")) {
    return <></>;
  }
  return <HwFolderNav />;
}

export default function Piazza() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PostSidebarProvider>
        <PiazzaNavBarTop />
        <FolderNav />

        <div className="wd-layout" style={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
          {!isFullScreen && (
            <SideBar
              isFullScreen={isFullScreen}
              setIsFullScreen={setIsFullScreen}
            />
          )}

<div className="wd-main-content" style={{ flexGrow: 1, overflowY: 'auto' }}>
                
          <Routes>
                  <Route
                  path="/"
               element={<RightSidePage 
                isFullScreen={isFullScreen} 
                setIsFullScreen={setIsFullScreen} />}
                    />
                 <Route
                  path="/NewPostPage"
                 element={<NewPostPage
                   isFullScreen={isFullScreen} 
                   setIsFullScreen={setIsFullScreen} />}
  />
              <Route path="/manage-class/*" element={<ManageClassScreen />} />
              <Route path="/post/:pid" 
              element={<ViewPostPage 
              isFullScreen={isFullScreen} 
              setIsFullScreen={setIsFullScreen}
              />} />
            </Routes>
          </div>
        </div>
      </PostSidebarProvider>
    </div>
  );
}
