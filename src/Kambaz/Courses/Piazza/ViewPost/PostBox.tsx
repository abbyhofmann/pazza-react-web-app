
import "./ViewPost.css";

interface PostBoxProps {

}

// Component for the individual post item in the sidebar. 
export default function PostBox(props: PostBoxProps) {

    const { } = props;

    return (
        <article id="qaContentViewId" className="main" aria-label="question">
            <header id="post-header" className="border-bottom container-fluid">
                <div className="row">
                    <div className="p-1 col-auto">
                        <svg width="24px" height="24px" aria-hidden="true" focusable="false">
                            <use xlinkHref="#Question"></use>
                        </svg>
                    </div>
                    <div className="text-left pl-0 col-auto">
                        <b>
                            <span tabIndex={-1} data-id="post_type" aria-label="Post type question 232">question</span>
                            &nbsp;
                            <button aria-label="Copy Post ID 232" type="button" className="p-0 post_number_copy btn btn-link-text">@232</button>
                            <span></span></b><button aria-label="Copy Post URL" type="button" className="url_copy btn btn-link-text">
                            <svg className="svg" width="14px" height="14px" viewBox="0 0 20 20"><use href="#Link"></use></svg>
                        </button><span></span><button aria-label="Add this post to your favorites" type="button" className="favorite-btn btn btn-link-text">
                            <span className="icon-font icon-star-full "></span></button></div><div className="text-right col">
                        <span id="postViewCountId" className="view-count"><b>5</b>
                            &nbsp;views</span>
                    </div>
                </div></header><div className="content container-fluid"><div className="g-0 row"><div className="col">
                    <div className="float-right dropdown">
                        <button aria-haspopup="false" aria-expanded="false" data-id="postActionMenuId" aria-label="Post Actions" type="button" className="dropdown-toggle btn btn-action">Actions</button>
                    </div><div className="py-3 history-selection"><h1 id="postViewSummaryId">Do we need images for Dashboard ?</h1>
                        <div id="m7h0gkl83kj3m3_render" data-id="renderHtmlId" className="render-html-content overflow-hidden latex_process">Changing the data source for dashboard now has no photos rendering for each course, do we need to fix this by using assets/images/?</div></div>
                    <div id="folder_select" className="folder_selector pb-3" aria-label="Folders Container" role="list">
                        <span className="" role="listitem"><button id="folder_0" aria-label="hw3 folder, click to filter feed" type="button" className="folder_button btn btn-primary">hw3</button></span>
                    </div></div></div></div><footer className="border-top container-fluid"><div className="row"><div className="text-left align-self-center py-0 col-auto"><button data-id="edit_button" aria-label="Edit question" type="button" className="mr-2 btn btn-primary btn-sm">Edit</button>
                        <span className="middot"></span><button data-id="endorse_idx0" aria-label="mark this as good question" type="button" className="text-notrans btn btn-link">good question</button>
                        <div data-id="endorse_count_idx0" className="d-inline-block good_post_number ml-1" aria-label="0 endorsements">&nbsp;0</div>
                    </div>
                        <div className="text-right col">
                            <div className="update_text" data-id="contributors">Updated 
                            <time dateTime="2025-02-23T02:29:44.000Z" title="Sat Feb 22 2025 21:29:44 GMT-0500 (Eastern Standard Time)">11 hours ago</time> by <span data-id="contributors">
                                <span>Anonymous Scale</span></span></div></div></div></footer></article>
    );
}
