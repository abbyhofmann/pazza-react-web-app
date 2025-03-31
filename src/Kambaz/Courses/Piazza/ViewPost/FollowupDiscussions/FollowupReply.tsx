import { useEffect, useState } from "react";
import usePostSidebar from "../../hooks/usePostSidebar";
import { Reply, User } from "../../../../types";
import { getReplyById } from "../../services/replyService";
import { getUser } from "../../services/userService";

interface FollowupReplyProps {
    replyId: string;
}

export default function FollowupReply(props: FollowupReplyProps) {

    const { replyId } = props;

    const { formatDate } = usePostSidebar();

    const [reply, setReply] = useState<Reply | null>(null);

    const [author, setAuthor] = useState<User | null>(null);

    // TODO - will need function to fetch author and determine if they are a student or instructor 
    // variable for determining which icon to display alongside reply 
    const isStudent = false;

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
                <b>
                    <span data-id="contributors">{`${author?.firstName} ${author?.lastName}`} </span>
                </b>
                <span className="helper-text">
                    <time>
                        {/* TODO - is the MM/DD/YYYY the format we want here? */}
                        {formatDate(reply ? reply.datePosted : "")}
                    </time>
                </span>
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