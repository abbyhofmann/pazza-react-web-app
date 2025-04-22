import { useNavigate, useParams } from "react-router";
import { Post, User } from "../../../types";
import { usePostSidebarContext } from "./usePostSidebarContext";
import { useEffect, useState } from "react";
import { deletePost, updatePost } from "../services/postService";
import { deleteAnswer } from "../services/answerService";
import { deleteFollowupDiscussion, getFollowupDiscussionById } from "../services/followupDiscussionService";
import { deleteReply } from "../services/replyService";
import { getUser } from "../services/userService";

const usePostBox = (post: Post, setPost: (postToSet: Post | null) => void) => {
    const { cid } = useParams();

    const navigate = useNavigate();

    const { fetchPosts } = usePostSidebarContext();

    // author of the post 
    const [author, setAuthor] = useState<User | null>(null);

    // keep track of if the user is editing the answer 
    const [isEditing, setIsEditing] = useState<boolean>(false);

    // keep track of if actions dropdown is showing 
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    // handle deleting answer
    const handleDelete = async () => {
        try {
            if (post && post._id) {
                // delete from db
                const deletedRes = await deletePost(post._id);
                if (deletedRes) {

                    // delete student answer if exists
                    if (post.studentAnswer) {
                        const deletedStudentAnswerRes = await deleteAnswer(post.studentAnswer);
                        if (!deletedStudentAnswerRes) {
                            throw new Error(`Error deleting student answer`);
                        }
                    }

                    // delete instructor answer if exists
                    if (post.instructorAnswer) {
                        const deletedInstructorAnswerRes = await deleteAnswer(post.instructorAnswer);
                        if (!deletedInstructorAnswerRes) {
                            throw new Error(`Error deleting instructor answer`);
                        }
                    }

                    // delete follow up discussions and their associated replies 
                    await Promise.all(
                        post.followupDiscussions.map(async fudId => {
                            const fetchedFud = await getFollowupDiscussionById(fudId);
                            if (fetchedFud._id !== undefined) {
                                // delete the fud's replies
                                await Promise.all(
                                    fetchedFud.replies.map(async rid => {
                                        const deletedReplyRes = await deleteReply(rid);
                                        if (!deletedReplyRes) {
                                            throw new Error(`Error deleting reply ${rid}`);
                                        }
                                    })
                                );

                                // delete the fud itself 
                                const deletedFudRes = await deleteFollowupDiscussion(fudId);
                                if (!deletedFudRes) {
                                    throw new Error(`Error deleting fud ${fudId}`);
                                }
                            }
                            else {
                                throw new Error(`Error fetching fud ${fudId}`);
                            }
                        }));

                    // set post to null 
                    setPost(null);
                    // update sidebar 
                    await fetchPosts();
                    // navigate to home page 
                    navigate(`/Kambaz/Courses/${cid}/Piazza`);
                }
                else {
                    throw new Error("Post deletion unsuccessful");
                }
            }
            else {
                throw new Error("Cannot delete a post that doesn't exist");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    // handle saving a post when it is being edited 
    const handleOnSave = async (updatedContent: string) => {
        try {
            const plainTextContent = updatedContent;

            if (post && post._id) {
                // update existing post
                const updatedPost = await updatePost(post._id, plainTextContent);
                setPost({ ...post, content: updatedPost.content });
            }
            else {
                throw new Error("Cannot update a post that doesn't exist");
            }
        } catch (error) {
            console.error("Error updating post:", error);
        }
        setIsEditing(false);
        setShowDropdown(false);
    };

    useEffect(() => {
        /**
         * Function to fetch the post-related data.
         */
        const fetchData = async () => {
            try {
                const fetchedAuthor = await getUser(post.authorId);
                if (fetchedAuthor._id !== undefined) {
                    setAuthor(fetchedAuthor);
                }
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Error fetching answer:', error);
            }
        };
        // eslint-disable-next-line no-console
        fetchData().catch(e => console.log(e));
    }, [post]);
    return {
        showDropdown,
        setShowDropdown,
        isEditing,
        setIsEditing,
        handleOnSave,
        handleDelete,
        author
    }
};

export default usePostBox;