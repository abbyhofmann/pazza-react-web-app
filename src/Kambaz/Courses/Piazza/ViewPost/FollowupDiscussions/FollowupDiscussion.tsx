import FollowupReply from "./FollowupReply";
import "./FollowupDiscussions.css";
import ResolvedButtons from "./ResolvedButtons/ResolvedButtons";
import { useEffect, useState } from "react";
import usePostSidebar from "../../hooks/usePostSidebar";
import { User, type FollowupDiscussion } from "../../../../types";
import { getFollowupDiscussionById } from "../../services/followupDiscussionService";
import { getUser } from "../../services/userService";

interface FollowupDiscussionProps {
    fudId: string;
}

export default function FollowupDiscussion(props: FollowupDiscussionProps) {

    const { fudId } = props;

    const [fud, setFud] = useState<FollowupDiscussion | null>(null);

    const [resolved, setResolved] = useState<boolean>(false);

    const [author, setAuthor] = useState<User | null>(null);

    const { formatDate } = usePostSidebar();

    useEffect(() => {
        /**
         * Function to fetch the discussion data based on the discussion's ID.
         */
        const fetchData = async () => {
            try {
                const res = await getFollowupDiscussionById(fudId);
                if (res) {
                    setFud(res);
                }
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Error fetching followup discussion:', error);
            }
        };

        // eslint-disable-next-line no-console
        fetchData().catch(e => console.log(e));
    }, [fudId]);

    useEffect(() => {
        if (!fud?.authorId) return;

        /**
         * Function to fetch author data. 
         */
        const fetchAuthor = async () => {
            try {
                const fetchedAuthor = await getUser(fud.authorId);
                if (fetchedAuthor) {
                    setAuthor(fetchedAuthor);
                }
            } catch (error) {
                console.error("Error fetching author: ", error);
            }
        };

        fetchAuthor();
    }, [fud?.authorId]);

    return (
        <div className="g-1 row">
            <ResolvedButtons resolved={resolved} setResolved={setResolved} />
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
                        {/* TODO - fix ! */}
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