import { createContext, useState, useEffect, ReactNode } from "react";
import { Post } from "../../types";
import { getPosts } from "./services/postService";

// Context items that need to be used across the application. 
type PostSidebarContextType = {
  posts: Post[];
  fetchPosts: () => Promise<void>;
};

// Context for sharing the posts data across the application. This is needed because as answers get added to a post, the 
// post sidebar needs to update to reflect the posts (specifically when a post is no longer "unanswered"). 
const PostSidebarContext = createContext<PostSidebarContextType | null>(null);

export const PostSidebarProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  
  const fetchPosts = async () => {
    try {
      const res = await getPosts();
      console.log("Fetched posts:", res);
  
      if (!Array.isArray(res)) {
        throw new Error("Fetched data is not an array");
      }
  
      setPosts(res);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostSidebarContext.Provider value={{ posts, fetchPosts }}>
      {children}
    </PostSidebarContext.Provider>
  );
};

export default PostSidebarContext;
