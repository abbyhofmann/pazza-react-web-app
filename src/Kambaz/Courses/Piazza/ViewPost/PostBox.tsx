import { Post } from "../../../types";
import "./ViewPost.css";
import ActionsDropdown from "./ActionsDropdown";
import EditingResponse from "./FollowupDiscussions/EditingResponse";
import usePostBox from "../hooks/usePostBox";

interface PostBoxProps {
    post: Post;
    setPost: (postToSet: Post | null) => void;
}

// Component for the individual post item in the sidebar. 
export default function PostBox(props: PostBoxProps) {

    const { post, setPost } = props;

    const {
        showDropdown,
        setShowDropdown,
        isEditing,
        setIsEditing,
        handleOnSave,
        handleDelete,
        author
    } = usePostBox(post, setPost);

    return (
        <article id="qaContentViewId" className="main" aria-label="question">
            <header id="post-header" className="border-bottom container-fluid">
                <div className="row">
                    <div className="text-left pl-0 col-auto">
                        <b>
                            {/* post type */}
                            <img className="me-1" width="24px" height="24px" aria-hidden="true" src={post.type === 0 ? "images/question.jpg" : "images/note.jpg"}></img>
                            <span tabIndex={-1} data-id="post_type">{post.type === 0 ? "question" : "note"}</span>
                            {/* post number */}
                            <button type="button" className="p-0 post_number_copy btn btn-link-text">@{(post._id ? post._id : "unknown post id")}</button>
                        </b>
                    </div>
                    <div className="text-right col">
                        {/* post view count */}
                        <span id="postViewCountId" className="view-count"><b>{post.viewers.length ?? 0}</b>
                            &nbsp;views</span>
                    </div>
                </div>
            </header>
            <div className="content container-fluid">
                <div className="g-0 row">
                    <div className="col">
                        <div className="float-end dropdown">
                            {/* actions dropdown */}
                            <ActionsDropdown showDropdown={showDropdown} setShowDropdown={setShowDropdown} setIsEditing={setIsEditing} handleDelete={handleDelete} />
                        </div>
                        <div className="py-3 history-selection">
                            {/* post title */}
                            <h1 id="postViewSummaryId" className="title">{post.title}</h1>
                            {/* post content */}
                            <div>
                                {isEditing ? (
                                    <EditingResponse initialFud={post ? post.content : ""} onSave={handleOnSave} onCancel={() => { setIsEditing(false); setShowDropdown(false); }} />
                                ) : (
                                    <div id="m7h0gkl83kj3m3_render" data-id="renderHtmlId" className="render-html-content overflow-hidden latex_process">{post.content}</div>

                                )}
                            </div>
                        </div>
                        <div id="folder_select" className="folder_selector pb-3" role="list">
                            {post.folders &&
                                post.folders.map((folder, index) =>
                                    <span role="listitem">
                                        <button id={`folder_` + index} type="button" className="folder_button btn btn-primary">{folder}</button>
                                    </span>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
            <footer className="border-top container-fluid">
                <div className="row">
                    <div className="text-left align-self-center m-1 col-auto">
                        {/* edit button */}
                        {!isEditing && (
                            <button
                                data-id="edit_button"
                                type="button"
                                className="mr-2 btn btn-primary btn-sm"
                                onClick={() => setIsEditing(true)}
                            >
                                Edit
                            </button>
                        )}
                    </div>
                    <div className="text-right col">
                        { /* author of post */}
                        <div className="update_text float-end" data-id="contributors">Posted by <span data-id="contributors">{`${author?.firstName} ${author?.lastName}`}</span>
                        </div>
                    </div>
                </div>
            </footer>
        </article>
    );
}
