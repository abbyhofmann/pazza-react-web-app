import { createContext, useState, useEffect, ReactNode } from "react";
import { Post } from "../../types";
import { getPostsInCourse } from "./services/postService";
import { useParams } from "react-router";

// Context items that need to be used across the application. 
type PostSidebarContextType = {
  posts: Post[];
  fetchPosts: (override?: boolean) => Promise<void>;
  setPosts: (newPosts: Post[]) => void;
  filterBy: string;
  setFilterBy: (folderName: string) => void;
};

// Context for sharing the posts data across the application. This is needed because as answers get added to a post, the 
// post sidebar needs to update to reflect the posts (specifically when a post is no longer "unanswered"). 
const PostSidebarContext = createContext<PostSidebarContextType | null>(null);

export const PostSidebarProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filterBy, setFilterBy] = useState<string>("");
  const { cid } = useParams();

  // function for fetching the posts 
  const fetchPosts = async (override = true) => {
    if (!override && filterBy !== "") return; // skip fetch if filtering
    try {
      const res = await getPostsInCourse(cid ?? "");
      setPosts(res);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cid]);

  return (
    <PostSidebarContext.Provider value={{ posts, fetchPosts, setPosts, filterBy, setFilterBy }}>
      {children}
    </PostSidebarContext.Provider>
  );
};

export default PostSidebarContext;
