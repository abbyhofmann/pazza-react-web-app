import PostListItem from "./PostListItem";
import "./PostSidebar.css";
import usePostSidebar from "../hooks/usePostSidebar";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import { useLocation, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import NewPostPage from "../NewPost";
import Piazza from "..";
import ViewPostPage from "../ViewPost/ViewPostPage/ViewPostPage";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import RightSidePage from "../RightSidePage";

// The post feed accordian-style sidebar.
export default function PostSidebar() {
  const [isFullScreen, setIsFullScreen] = useState(false);;
  const {pid} = useParams();
  //const location = useLocation();
  
  const handleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  //  setScreen(handleScreenType(locaton.pathname));
  };

  


  const renderFullScreenContent = () => {
    const hash = window.location.hash;
    const path = location.pathname;

    if (hash.includes("NewPostPage")) {
    return <NewPostPage />;
  }

  else if (hash === `#/Kambaz/Courses/${cid}/Piazza`) {
    return <RightSidePage/>;
  }

  else if (hash.includes("Piazza/post")) {
    return <ViewPostPage />;
  }else {
      return <h2>You're in Full Screen Mode!</h2>;
    }
  };




 // const { posts } = usePostSidebarContext();
 


  const {
    formatDate,
    extractTime,
    getDayOfWeek,
    handlePostClick,
    selectedPostId,
    datesLastWeek,
    groupedPostsMap,
    today,
    yesterday,
  } = usePostSidebar();

  const [posts, setPosts] = useState<any[]>([]);

  const fetchPosts = async () => {
     try {
        const response = await fetch("http://localhost:3000/api/posts"); 
        if (response.ok) {
           const data = await response.json();
           setPosts(data.reverse());  
           
        } else {
           console.error("Failed to fetch posts");
        }
     } catch (error) {
        console.error("Error fetching posts:", error);
     }
  }; 

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleNewPost = async (newPost: any) => {
   
    try {
      const response = await fetch("http://localhost:3000/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(newPost),
      }
      );
      if (response.ok) {
        const createdPost = await response.json();
        setPosts((prevPosts) => [createdPost, ...prevPosts]);
      } else {
        console.error("Failed to creare Post");
      }
  } catch (error) {
    console.error("Error posting new Post", error);
  }
};

  const navigate = useNavigate();
    const { cid } = useParams();

  const navButton = () => {
    navigate(`/Kambaz/Courses/${cid}/Piazza/NewPostPage`)
    ;
  }

  return (

    <div
    className={`d-flex flex-column align-items-stretch flex-shrink-0 bg-white border-end 
      ${isFullScreen ? 'fullscreen' : ''}`}
    style={{ width: isFullScreen ? '100%' : '380px',
             display: isFullScreen ? "none" : "block",
             transition: "all 0..3s east",
    }}
  >
    <div id="carrot_bar" className={`${isFullScreen ? 'fullscreen-header' : ''}`}>
    <button id="carrot_button" type="button" onClick={handleFullScreen}>
      {isFullScreen ?  (
          <FaCaretRight className="ms-1 mb-1 fs-5" />
      ) : (
        <FaCaretLeft className="mb-1 me-1 fs-5" />
      )}
        </button>

  
        <div className="vertical-line"></div>
          
        {!isFullScreen && ( 
          <div className="d-flex wd-carrot-filters ms-2 align-items-center">
            <div>Unread</div>
            <div className="ms-2">Updated</div>  
            <div className="ms-2">Unresolved</div> 
            <div className="ms-2">Following</div>    
          </div>
        )}
        
        {isFullScreen && <div>{renderFullScreenContent()}</div>}
  </div>
      

        <div id="feed_search_bar" 
        className={`d-flex ${isFullScreen ? 'fullscreen' : ''}`}
          style={{ width: isFullScreen ? '100%' : '380px',
               display: isFullScreen ? "none" : "block",
               transition: "all 0..3s east",
      }}
    >
            <button id="new_post_button" type="button" onClick={navButton}>
              <BsFileEarmarkPostFill className="me-1 mb-1 fs-6" />
            New Post
          </button>
          <div id="search_bar" role="search">
            <input
              type="text"
              placeholder="Search or add a post..."
              id="search-box"
              className="form-control"
            />
          </div>
        </div>

        {/* Dropdown Section */}
        <div className="accordion" id="postAccordion"
        style={{
          display: isFullScreen ? 'none' : 'block',
        }}
        >
          <div className="card border-0">
            {/* Today Dropdown Header */}
            <div
              className="mb-0 bucket-header gray-bar d-flex align-items-center px-3 py-2"
              data-bs-toggle="collapse"
              data-bs-target="#collapseToday"
              aria-expanded="true"
              aria-controls="collapseToday"
            >
              <span aria-hidden="true" className="me-1">
                ▾
              </span>
              <span>TODAY</span>
            </div>

            {/* Today Collapsible Content */}
            <div id="collapseToday" className="collapse show">
              <ul className="list-group list-group-flush">
                {posts
                  .filter((post: any) => formatDate(post.datePosted) === today)
                  .map((post: any) => (
                    <PostListItem
                      _id={post._id}
                      title={post.title}
                      content={(post.content)}
                      datePosted={post.datePosted}
                      instructor={post.instructor}
                      displayDate={extractTime}
                      onClick={() => handlePostClick(post._id)}
                      isSelected={selectedPostId === post._id}
                    />
                  ))}
              </ul>
            </div>

            {/* Yesterday Dropdown Header */}
            <div
              className="mb-0 bucket-header gray-bar d-flex align-items-center px-3 py-2"
              data-bs-toggle="collapse"
              data-bs-target="#collapseYesterday"
              aria-expanded="true"
              aria-controls="collapseYesterday"
            >
              <span aria-hidden="true" className="me-1">
                ▾
              </span>
              <span>YESTERDAY</span>
            </div>

            {/* Yesterday Collapsible Content */}
            <div id="collapseYesterday" className="collapse show">
              <ul className="list-group list-group-flush">
                {posts
                  .filter((post: any) => formatDate(post.datePosted) === yesterday)
                  .map((post: any) => (
                    <PostListItem
                      _id={post._id}
                      title={post.title}
                      content={post.content}
                      datePosted={post.datePosted}
                      instructor={post.instructor}
                      displayDate={extractTime}
                      onClick={() => handlePostClick(post._id)}
                      isSelected={selectedPostId === post._id}
                    />
                  ))}
              </ul>
            </div>

            {/* Last Week Dropdown Header - TODO: may want to have the data sorted so the days appear in order of most to least recent */}
            <div
              className="mb-0 bucket-header gray-bar d-flex align-items-center px-3 py-2"
              data-bs-toggle="collapse"
              data-bs-target="#collapseLastWeek"
              aria-expanded="true"
              aria-controls="collapseLastWeek"
            >
              <span aria-hidden="true" className="me-1">
                ▾
              </span>
              <span>LAST WEEK</span>
            </div>

            {/* Last Week Collapsible Content */}
            <div id="collapseLastWeek" className="collapse show">
              <ul className="list-group list-group-flush">
                {posts
                  .filter((post: any) =>
                    datesLastWeek.includes(formatDate(post.datePosted))
                  )
                  .map((post: any) => (
                    <PostListItem
                      _id={post._id}
                      title={post.title}
                      content={post.content}
                      datePosted={post.datePosted}
                      instructor={post.instructor}
                      displayDate={getDayOfWeek}
                      onClick={() => handlePostClick(post._id)}
                      isSelected={selectedPostId === post._id}
                    />
                  ))}
              </ul>
            </div>

            {/* Date Range Display for Older Posts */}
            {Array.from(groupedPostsMap.entries()).map(
              ([dateRange, postsInRange]) => (
                <div>
                  <div
                    className="mb-0 bucket-header gray-bar d-flex align-items-center px-3 py-2"
                    data-bs-toggle="collapse"
                    data-bs-target={`#collapse${dateRange.replace(
                      /[^a-zA-Z0-9]/g,
                      ""
                    )}`} // remove the / and - characters from the date range string
                    aria-expanded="true"
                    aria-controls={`collapse${dateRange.replace(
                      /[^a-zA-Z0-9]/g,
                      ""
                    )}`}
                  >
                    <span aria-hidden="true" className="me-1">
                      ▾
                    </span>
                    <span>{dateRange}</span>
                  </div>

                  <div
                    id={`collapse${dateRange.replace(/[^a-zA-Z0-9]/g, "")}`}
                    className="collapse show"
                  >
                    <ul className="list-group list-group-flush">
                      {postsInRange.map(
                        (post: {
                          _id: string;
                          folderId: string;
                          authorId: string;
                          datePosted: string;
                          type: number;
                          instructor: boolean;
                          title: string;
                          content: string;
                          followUpQuestions: string;
                          studentResponse: string;
                          instructorResponse: string;
                          viewers: string;
                          courseId: string;
                        }) => (
                          <PostListItem
                            _id={post._id}
                            title={post.title}
                            content={post.content}
                            datePosted={post.datePosted}
                            instructor={post.instructor}
                            displayDate={formatDate}
                            onClick={() => handlePostClick(post._id)}
                            isSelected={selectedPostId === post._id}
                          />
                        )
                      )}
                    </ul>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
 
  );
}