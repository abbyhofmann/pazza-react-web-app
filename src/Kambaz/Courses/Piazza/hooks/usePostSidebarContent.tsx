import { useContext } from "react";

// custom hook to use the context
export const usePostSidebarContext = () => {
    const context = useContext(usePostSidebarContext);
    if (!context) {
      throw new Error("usePostSidebarContext must be used within a PostSidebarProvider");
    }
    return context;
  };