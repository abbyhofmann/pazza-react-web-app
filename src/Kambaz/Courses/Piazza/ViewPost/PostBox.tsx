import { Post } from "../../../types";
import "./ViewPost.css";

interface PostBoxProps {
    post: Post;
}

// Component for the individual post item in the sidebar. 
export default function PostBox(props: PostBoxProps) {

    const { post } = props;

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
                        <span id="postViewCountId" className="view-count"><b>5</b> {/* TODO - make this length of viewers list */}
                            &nbsp;views</span>
                    </div>
                </div>
            </header>
            <div className="content container-fluid">
                <div className="g-0 row">
                    <div className="col">
                        <div className="float-end dropdown">
                            {/* actions dropdown */}
                            <button aria-haspopup="false" aria-expanded="false" data-id="postActionMenuId" type="button" className="dropdown-toggle btn btn-action">Actions</button>  { /* TODO - should only be visible to creator of post and instructors */}
                        </div>
                        <div className="py-3 history-selection">
                            {/* post title */}
                            <h1 id="postViewSummaryId" className="title">{post.title}</h1>
                            {/* post content */}
                            <div id="m7h0gkl83kj3m3_render" data-id="renderHtmlId" className="render-html-content overflow-hidden latex_process">{post.content}</div>
                        </div>
                        <div id="folder_select" className="folder_selector pb-3" role="list">
                            <span role="listitem">
                                {/* folder */}
                                <button id="folder_0" type="button" className="folder_button btn btn-primary">hw3</button> { /* TODO - need to use the folder id of the post object to retrieve the folder name */}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="border-top container-fluid">
                <div className="row">
                    <div className="text-left align-self-center m-1 col-auto">
                        {/* edit button */}
                        <button data-id="edit_button" type="button" className="mr-2 btn btn-primary btn-sm">Edit</button> { /* TODO - edit should only available to creator of post and instructors */}
                    </div>
                </div>
            </footer>
        </article>
    );
}
