import { useEffect, useState } from "react";
import { addReplyToDiscussion, deleteFollowupDiscussion, getFollowupDiscussionById, updateFud } from "../services/followupDiscussionService";
import { createReply, deleteReply } from "../services/replyService";
import usePostSidebar from "./usePostSidebar";
import { FollowupDiscussion, Reply, User } from "../../../types";
import { getUser } from "../services/userService";
import { removeFudFromPost } from "../services/postService";

const useFollowupDiscussion = (fudId: string, setPost: (post: any) => void) => {

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

    // keep track of if actions dropdown is showing 
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    // keep track of if the user is editing the followup discussion 
    const [isEditing, setIsEditing] = useState<boolean>(false);

    // function for formatting the date
    const { formatDate } = usePostSidebar();

    // handle submitting a new fud 
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
        setShowDropdown(false);
    };

    // handle saving a fud when it is being edited 
    const handleOnSave = async (updatedContent: string) => {

        try {
            // convert HTML content from React Quill to plain text before saving in database 
            const doc = new DOMParser().parseFromString(updatedContent, "text/html");
            const plainTextContent = doc.body.textContent || "";

            if (fud && fud._id) {
                // update existing fud
                const updatedFud = await updateFud(fud._id, plainTextContent);
                setFud({ ...fud, content: updatedFud.content });
            }
            else {
                throw new Error("Cannot update a fud that doesn't exist");
            }
        } catch (error) {
            console.error("Error updating fud:", error);
        }
        setIsEditing(false);
        setShowDropdown(false);
    };

    // handle deleting a fud
    const handleDelete = async () => {
        try {
            if (fud) {
                // delete from db
                const deletedRes = await deleteFollowupDiscussion(fudId);
                if (deletedRes) {
                    // delete the fud's replies 
                    await Promise.all(
                        fud.replies.map(async replyId => {
                            const deletedReplyRes = await deleteReply(replyId);
                            if (!deletedReplyRes) {
                                throw new Error(`Reply deletion ${replyId} unsuccessful`);
                            }
                        }));

                    // remove from post 
                    const postWithFudDeleted = await removeFudFromPost(fud?.postId, fudId);

                    // set the post so the new answer component is displayed 
                    if (postWithFudDeleted) {
                        setPost(postWithFudDeleted);
                    }
                    else {
                        throw new Error("Answer deletion unsuccessful");
                    }
                }

            } else {
                throw new Error("Cannot delete an answer that doesn't exist");
            }
        } catch (error) {
            console.error("Error deleting answer:", error);
        }
    };

    useEffect(() => {
        /**
         * Function to fetch the discussion data based on the discussion's ID.
         */
        const fetchData = async () => {
            try {
                const res = await getFollowupDiscussionById(fudId);
                if (res) {
                    setFud(res);
                    setResolved(res.resolved);
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
        showDropdown,
        setShowDropdown,
        handleDelete,
        isEditing,
        setIsEditing,
        handleOnSave
    }
}

export default useFollowupDiscussion;