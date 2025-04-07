import { createContext, useState, useEffect, ReactNode } from "react";
import { Post } from "../../types";
import { getPosts } from "./services/postService";

// Context items that need to be used across the application. 
type PostSidebarContextType = {
  posts: Post[];
  fetchPosts: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

// Context for sharing the posts data across the application
const PostSidebarContext = createContext<PostSidebarContextType | null>(null);

export const PostSidebarProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Function for fetching the posts 
  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const res = await getPosts();
      setPosts(res);
      setError(null); // Reset error on successful fetch
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load posts.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <PostSidebarContext.Provider value={{ posts, fetchPosts, isLoading, error }}>
      {children}
    </PostSidebarContext.Provider>
  );
};

export default PostSidebarContext;
