import { FollowupDiscussion } from "../../../../types";
import ActionsDropdown from "../ActionsDropdown";
import EditingResponse from "./EditingResponse";
import useFollowupReply from "../../hooks/useFollowupReply";

interface FollowupReplyProps {
    replyId: string;
    setFud: (newFud: FollowupDiscussion) => void;
}

// Component for rendering a reply to a followup discussion.
export default function FollowupReply(props: FollowupReplyProps) {

    const { replyId, setFud } = props;

    const {
        isStudent,
        author,
        formatDate,
        reply,
        showDropdown,
        setShowDropdown,
        isEditing,
        setIsEditing,
        handleOnSave,
        handleDelete
    } = useFollowupReply(replyId, setFud);

    return (
        <div
            data-id="followup_reply_idx1_0"
            id="m7mvuzhntd4fj"
            className="followup_reply gx-1 gy-0 row"
        >
            <div className="mx-0 col-auto">
                <img width="30px" height="30px" aria-hidden="true" src="images/profilePic.jpg" />
            </div>
            <div className="mx-0 col-auto">
                <img className="" width="14px" height="16px" aria-hidden="true" src={isStudent ? "images/studentIcon.jpg" : "images/instructorIcon.jpg"} />
            </div>
            <div className="col">
                <div className="align-items-center row">
                    <div className="col-auto">
                        <b>
                            <span data-id="contributors">{`${author?.firstName} ${author?.lastName}`} </span>
                        </b>
                        <span className="helper-text">
                            <time>
                                {/* TODO - is the MM/DD/YYYY the format we want here? */}
                                {formatDate(reply ? reply.datePosted : "")}
                            </time>
                        </span>

                    </div>
                    <div className="col-auto ms-auto me-0">
                        {/* dropdown for editing and deleting */}
                        <ActionsDropdown showDropdown={showDropdown} setShowDropdown={setShowDropdown} setIsEditing={setIsEditing} handleDelete={handleDelete} authors={[reply?.authorId ?? ""]} />
                    </div>
                </div>
                <div>

                    {isEditing ? (
                        <EditingResponse initialFud={reply ? reply.content : ""} onSave={handleOnSave} onCancel={() => { setIsEditing(false); setShowDropdown(false); }} />
                    ) : (

                        <div
                            id="m7mvuzhntd4fj_render"
                            className="render-html-content overflow-hidden latex_process"
                        >
                            {reply?.content}
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}