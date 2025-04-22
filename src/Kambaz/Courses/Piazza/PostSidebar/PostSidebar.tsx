import PostListItem from "./PostListItem";
import "./PostSidebar.css";
import usePostSidebar from "../hooks/usePostSidebar";
import { BsFileEarmarkPostFill } from "react-icons/bs";
import { Post } from "../../../types";
import { usePostSidebarContext } from "../hooks/usePostSidebarContext";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";


type PostSidebarProps = {
  isFullScreen: boolean;
  setIsFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
};


// The post feed accordian-style sidebar.
export default function PostSidebar({ isFullScreen, setIsFullScreen }: PostSidebarProps) {

  const handleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  



  const { posts } = usePostSidebarContext();

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
    isUnanswered,
    navButton,
  } = usePostSidebar();

  return (
    <div
      className={`d-flex flex-column align-items-stretch flex-shrink-0 bg-white border-end 
        ${isFullScreen ? 'fullscreen' : ''}`}
      style={{ width: isFullScreen ? '100vh' : '380px',
               display: isFullScreen ? "none" : "block",
               transition: "all 0..3s east",
      }}
    >
      <div id="carrot_bar" className={`${isFullScreen ? 'fullscreen-header' : ''}`}>
        <button id="carrot_button" type="button" onClick={handleFullScreen}>
          {isFullScreen ? (
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
        
    
  </div>
      

      <div id="feed_search_bar"
        className={`d-flex ${isFullScreen ? 'fullscreen' : ''}`}
        style={{
          width: isFullScreen ? '100%' : '380px',
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
              .filter((post) => formatDate(post.datePosted) === today)
              .sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime())
              .map((post) => (
                    <PostListItem
                      key={post._id}
                      title={post.title}
                      content={post.content}
                      datePosted={post.datePosted}
                      instructor={post.instructor}
                      displayDate={extractTime}
                      onClick={() => handlePostClick(post._id!)} // TODO - is this how to handle the undefined???
                      isSelected={selectedPostId === post._id}
                      isUnanswered={isUnanswered(post)}
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
                .filter((post) => formatDate(post.datePosted) === yesterday)
                .map((post) => (
                  <PostListItem
                    key={post._id}
                    title={post.title}
                    content={post.content}
                    datePosted={post.datePosted}
                    instructor={post.instructor}
                    displayDate={extractTime}
                    onClick={() => handlePostClick(post._id!)}
                    isSelected={selectedPostId === post._id}
                    isUnanswered={isUnanswered(post)}
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
                .filter((post) =>
                  datesLastWeek.includes(formatDate(post.datePosted))
                )
                .map((post) => (
                  <PostListItem
                    key={post._id}
                    title={post.title}
                    content={post.content}
                    datePosted={post.datePosted}
                    instructor={post.instructor}
                    displayDate={getDayOfWeek}
                    onClick={() => handlePostClick(post._id!)}
                    isSelected={selectedPostId === post._id}
                    isUnanswered={isUnanswered(post)}
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
                      (post: Post) => (
                        <PostListItem
                          key={post._id}
                          title={post.title}
                          content={post.content}
                          datePosted={post.datePosted}
                          instructor={post.instructor}
                          displayDate={formatDate}
                          onClick={() => handlePostClick(post._id!)}
                          isSelected={selectedPostId === post._id}
                          isUnanswered={isUnanswered(post)}
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