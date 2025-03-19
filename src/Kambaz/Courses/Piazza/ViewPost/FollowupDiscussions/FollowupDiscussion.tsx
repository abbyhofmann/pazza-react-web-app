import FollowupReply from "./FollowupReply";
import "./FollowupDiscussions.css";

export default function FollowupDiscussion() {
    return (
        <div className="g-1 row">
            <div className="mx-0 col-auto">
                <div className="avatar" aria-hidden="true" style={{ backgroundImage: `url("images/anonProfilePic.png")` }}></div>
            </div>
            <div className="col">
                <span data-id="contributors">
                    <b>Anonymous Beaker</b>
                </span>
                &nbsp;
                <span className="helper-text">
                    <time
                        dateTime="2025-02-27T05:06:15.000Z"
                        title="Thu Feb 27 2025 00:06:15 GMT-0500 (Eastern Standard Time)"
                    >
                        2 weeks ago
                    </time>
                </span>
                <div
                    id="m7mvt9ipcj61pk_render"
                    data-id="renderHtmlId"
                    className="render-html-content overflow-hidden latex_process"
                >
                    Is this for rule 45 for 100% for all sections?
                </div>
                {/* TODO - loop through the replies list */}
                <FollowupReply replyId={'1234'}/>

                <div className="gx-1 followup comment pr-0 pl-0 pb-0 row">
                    <div className="pr-0 mr-0 pl-0 pb-0 col">
                        <input
                            data-id="followup_reply_idx1"
                            type="text"
                            className="form-control ng-pristine ng-valid my-0"
                            placeholder="Reply to this followup discussion"
                            aria-label="Click to reply to this followup discussion"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}