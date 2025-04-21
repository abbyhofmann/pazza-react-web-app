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

type FullScreenContentProps = {
  isFullScreen: boolean;
  setIsFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FullScreenContent = ({ isFullScreen, setIsFullScreen }: FullScreenContentProps) => {
  const location = useLocation();
  const pathname = location.pathname;

  if (pathname.includes("NewPostPage")) {
    return <NewPostPage isFullScreen={isFullScreen} setIsFullScreen={setIsFullScreen} />;
  } else if (pathname.includes("/post/")) {
    return <ViewPostPage isFullScreen={isFullScreen} setIsFullScreen={setIsFullScreen}/>;
  } else {
    return <RightSidePage isFullScreen={isFullScreen} setIsFullScreen={setIsFullScreen} />;
  }
};


export default function Piazza() {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <div>
      <PostSidebarProvider>
        <PiazzaNavBarTop />
        <HwFolderNav />

        <div className="wd-layout">
          {!isFullScreen && (
            <SideBar
              isFullScreen={isFullScreen}
              setIsFullScreen={setIsFullScreen}
            />
          )}

          <div className="wd-main-content">
                
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
