import { useEffect, useState } from "react";
import { addReplyToDiscussion, getFollowupDiscussionById } from "../services/followupDiscussionService";
import { createReply } from "../services/replyService";
import usePostSidebar from "./usePostSidebar";
import { FollowupDiscussion, Reply, User } from "../../../types";
import { getUser } from "../services/userService";

const useFollowupDiscussion = (fudId: string) => {
    
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

    return {
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
    }
}

export default useFollowupDiscussion;