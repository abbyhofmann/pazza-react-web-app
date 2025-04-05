import FollowupReply from "./FollowupReply";
import "./FollowupDiscussions.css";
import ResolvedButtons from "./ResolvedButtons/ResolvedButtons";
import { useEffect, useState } from "react";
import usePostSidebar from "../../hooks/usePostSidebar";
import { Reply, User, type FollowupDiscussion } from "../../../../types";
import { addReplyToDiscussion, getFollowupDiscussionById } from "../../services/followupDiscussionService";
import { getUser } from "../../services/userService";
import EditorComponent from "../EditorComponent";
import { createReply } from "../../services/replyService";

interface FollowupDiscussionProps {
    fudId: string;
}

// Component for rendering an individual followup discussion.
export default function FollowupDiscussion(props: FollowupDiscussionProps) {

    const { fudId } = props;

    // followup discussion being rendered
    const [fud, setFud] = useState<FollowupDiscussion | null>(null);

    // resolved status of the discussion
    const [resolved, setResolved] = useState<boolean>(false);

    // author of the followup discussion
    const [author, setAuthor] = useState<User | null>(null);

    // keep track of if user is replying
    const [isReplying, setIsReplying] = useState<boolean>(false);

    // content of new reply 
    const [replyContent, setReplyContent] = useState<string>("");

    // function for formatting the date
    const { formatDate } = usePostSidebar();

    const handleSubmit = async (newReplyContent: string) => {
        try {
            const doc = new DOMParser().parseFromString(newReplyContent, "text/html");
            const plainTextContent = doc.body.textContent || "";

            const newReply: Reply = {
                followupDiscussionId: fudId,
                authorId: "345", // TODO 
                datePosted: new Date().toDateString(),
                content: plainTextContent.trim()
            };

            const newReplyFromDb = await createReply(newReply);

            if (newReplyFromDb?._id) {
                const updatedDiscussion = await addReplyToDiscussion(fudId, newReplyFromDb._id);
                setFud(updatedDiscussion);
                setReplyContent("");
            }
        } catch (error) {
            console.error("Error creating reply:", error);
        }
        // close the editor component
        setIsReplying(false);
    }

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