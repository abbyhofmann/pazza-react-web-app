import { useEffect, useState } from "react";
import usePostSidebar from "../../hooks/usePostSidebar";
import { FollowupDiscussion, Reply, User } from "../../../../types";
import { deleteReply, getReplyById } from "../../services/replyService";
import { getUser } from "../../services/userService";
import ActionsDropdown from "../ActionsDropdown";
import { removeReplyFromFud } from "../../services/followupDiscussionService";

interface FollowupReplyProps {
    replyId: string;
    setFud: (newFud: FollowupDiscussion) => void;
}

// Component for rendering a reply to a followup discussion.
export default function FollowupReply(props: FollowupReplyProps) {

    const { replyId, setFud } = props;

    const { formatDate } = usePostSidebar();

    // reply being rendered
    const [reply, setReply] = useState<Reply | null>(null);

    // author of the reply 
    const [author, setAuthor] = useState<User | null>(null);

    // variable for determining which icon to display alongside reply 
    const [isStudent, setIsStudent] = useState<boolean>(false);

    // keep track of if actions dropdown is showing 
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    // keep track of if the user is editing the reply
    const [isEditing, setIsEditing] = useState<boolean>(false);

    // handle deleting a reply
    const handleDelete = async () => {
        try {
            if (reply) {
                // delete from db
                const deletedRes = await deleteReply(replyId);
                if (deletedRes) {
                    // remove from fud 
                    const fudWithReplyDeleted = await removeReplyFromFud(reply?.followupDiscussionId, replyId);

                    // set the post so the new answer component is displayed 
                    if (fudWithReplyDeleted) {
                        // TODO - maybe need to call setFud
                        setFud(fudWithReplyDeleted);
                    }
                    else {
                        throw new Error("Reply deletion unsuccessful");
                    }
                }

            } else {
                throw new Error("Cannot delete a reply that doesn't exist");
            }
        } catch (error) {
            console.error("Error deleting reply:", error);
        }
    };


    useEffect(() => {
        /**
         * Function to fetch the reply data based on the reply's ID.
         */
        const fetchData = async () => {
            try {
                const res = await getReplyById(replyId);
                setReply(res || null);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Error fetching reply:', error);
            }
        };

        // eslint-disable-next-line no-console
        fetchData().catch(e => console.log(e));
    }, [replyId]);

    useEffect(() => {
        if (!reply?.authorId) return;

        /**
         * Function to fetch author data. 
         */
        const fetchAuthor = async () => {
            try {
                const fetchedAuthor = await getUser(reply.authorId);
                if (fetchedAuthor) {
                    setAuthor(fetchedAuthor);
                    setIsStudent(fetchedAuthor.role === "STUDENT");
                }
            } catch (error) {
                console.error("Error fetching author: ", error);
            }
        };

        fetchAuthor();
    }, [reply?.authorId]);

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
                    <ActionsDropdown showDropdown={showDropdown} setShowDropdown={setShowDropdown} setIsEditing={setIsEditing} handleDelete={handleDelete} />
                </div>
                </div>
                
                <div
                    id="m7mvuzhntd4fj_render"
                    className="render-html-content overflow-hidden latex_process"
                >
                    {reply?.content}
                </div>
            </div>
        </div>
    )
}