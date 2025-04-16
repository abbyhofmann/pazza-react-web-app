import FollowupReply from "./FollowupReply";
import "./FollowupDiscussions.css";
import ResolvedButtons from "./ResolvedButtons/ResolvedButtons";
import { type FollowupDiscussion } from "../../../../types";
import EditorComponent from "../EditorComponent";
import useFollowupDiscussion from "../../hooks/useFollowupDiscussion";
import ActionsDropdown from "../ActionsDropdown";

interface FollowupDiscussionProps {
    fudId: string;
    setPost: (post: any) => void;
}

// Component for rendering an individual followup discussion.
export default function FollowupDiscussion(props: FollowupDiscussionProps) {

    const { fudId, setPost } = props;

    const {
        resolved,
        setResolved,
        author,
        formatDate,
        fud,
        isReplying,
        setIsReplying,
        replyContent,
        setReplyContent,
        handleSubmit,
        showDropdown,
        setShowDropdown,
        handleDelete
    } = useFollowupDiscussion(fudId, setPost);

    return (
        <div className="g-1 row">
            <div className="align-items-center row">
            <div className="col-auto">
                <ResolvedButtons fudId={fudId} resolved={resolved} setResolved={setResolved} />
                </div>
                <div className="col-auto ms-auto me-0">
                {/* dropdown for editing and deleting */}
                <ActionsDropdown showDropdown={showDropdown} setShowDropdown={setShowDropdown} setIsEditing={setIsReplying} handleDelete={handleDelete} />
                </div>
            </div>
            <div className="mx-0 col-auto">
                <img className="avatar" width="30px" height="30px" aria-hidden="true" src="images/anonProfilePic.jpg" />
            </div>
            <div className="col">
                <span data-id="contributors">
                    <b>{`${author?.firstName} ${author?.lastName}`}</b>
                </span>
                &nbsp;
                <span className="helper-text">
                    <time
                    >
                        {formatDate(fud ? fud.datePosted : "")}
                    </time>
                </span>
                <div
                    id="m7mvt9ipcj61pk_render"
                    className="render-html-content overflow-hidden latex_process"
                >
                    {fud?.content}
                </div>
                {/* loop through the replies list to render each reply */}
                {fud?.replies.map((replyId => (<FollowupReply replyId={replyId} />)))}

                <div className="gx-1 followup comment pr-0 pl-0 pb-0 row">
                    <div className="pr-0 mr-0 pl-0 pb-0 col">
                        {!isReplying ? (
                            <input
                                data-id="followup_reply_idx1"
                                type="text"
                                className="form-control ng-pristine ng-valid my-0"
                                placeholder="Reply to this followup discussion"
                                onFocus={() => setIsReplying(true)}
                            />
                        ) :
                            (<EditorComponent content={replyContent} setContent={setReplyContent} />)
                        }
                    </div>
                </div>
                {isReplying &&
                    <footer className="border-top container-fluid">
                        <div className="row">
                            <div className="text-left align-self-center m-1 col-auto">
                                <button className="btn btn-primary btn-sm me-2" onClick={() => handleSubmit(replyContent)}>Submit</button>
                                <button className="btn btn-secondary btn-sm" onClick={() => { setIsReplying(false); setReplyContent(""); }}>Cancel</button>
                            </div>
                        </div>
                    </footer>
                }
            </div>
        </div>
    )
}