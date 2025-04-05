import { useState } from "react";
import { FollowupDiscussion, Post } from "../../../types";
import { createDiscussion } from "../services/followupDiscussionService";
import { addDiscussionToPost } from "../services/postService";

const useFollowupDiscussions = (
    setPost: (post: Post) => void,
    postId: string) => {

    // boolean indicating if a new discussion is being created
    const [startingNewDiscussion, setStartingNewDiscussion] = useState<boolean>(false);

    // boolean for keeping track of the content of a new discussion
    const [discussionContent, setDiscussionContent] = useState<string>("");

    // function to handle creation/saving of a new discussion
    const handleOnSave = async (newDiscussionContent: string) => {
        try {
            // convert HTML content from React Quill to plain text before saving in database 
            const doc = new DOMParser().parseFromString(newDiscussionContent, "text/html");
            const plainTextContent = doc.body.textContent || "";

            const newDiscussion: FollowupDiscussion = {
                postId: postId,
                authorId: "123",
                datePosted: new Date().toDateString(),
                content: plainTextContent.trim(),
                replies: []
            };
            // create the followup discussion in the db
            const newDiscussionFromDb = await createDiscussion(newDiscussion);

            if (newDiscussionFromDb?._id) {
                // add the new discussion to the post list of fudIds
                const updatedPost = await addDiscussionToPost(postId, newDiscussionFromDb._id);
                // set the post that's rendering to be the updated post
                setPost(updatedPost);
                // clear the discussion content for the next new discussion 
                setDiscussionContent("");
            }
        } catch (error) {
            console.error("Error creating followup discussion:", error);
        }
        // close the editor component
        setStartingNewDiscussion(false);
    }
    return {
        startingNewDiscussion,
        setStartingNewDiscussion,
        discussionContent,
        setDiscussionContent,
        handleOnSave
    }
}

export default useFollowupDiscussions;