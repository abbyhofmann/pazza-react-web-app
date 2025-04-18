import { useEffect, useState } from "react";
import { deleteReply, getReplyById, updateReply } from "../services/replyService";
import { getUser } from "../services/userService";
import { removeReplyFromFud } from "../services/followupDiscussionService";
import usePostSidebar from "./usePostSidebar";
import { FollowupDiscussion, Reply, User } from "../../../types";

const useFollowupReply = (replyId: string, setFud: (fud: FollowupDiscussion) => void) => {
    
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

    // handle saving a reply when it is being edited 
    const handleOnSave = async (updatedContent: string) => {

        try {
            // convert HTML content from React Quill to plain text before saving in database 
            const doc = new DOMParser().parseFromString(updatedContent, "text/html");
            const plainTextContent = doc.body.textContent || "";

            if (reply && reply._id) {
                // update existing reply
                const updatedReply = await updateReply(reply._id, plainTextContent);
                setReply({ ...reply, content: updatedReply.content });
            }
            else {
                throw new Error("Cannot update a reply that doesn't exist");
            }
        } catch (error) {
            console.error("Error updating reply:", error);
        }
        setIsEditing(false);
        setShowDropdown(false);
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

    return {
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
    }
}

export default useFollowupReply;