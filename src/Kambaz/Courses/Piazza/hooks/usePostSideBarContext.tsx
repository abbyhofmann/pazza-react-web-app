import { useContext } from "react";
import PostSidebarContext from "../PostSideBarContext";

// custom hook to use the context
export const usePostSidebarContext = () => {
    const context = useContext(PostSidebarContext);
    if (!context) {
      throw new Error("usePostSidebarContext must be used within a PostSidebarProvider");
    }
    return context;
  };