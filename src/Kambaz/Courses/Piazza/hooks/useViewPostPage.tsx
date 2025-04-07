import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Answer, Post } from "../../../types";
import { createAnswer } from "../services/answerService";
import { addAnswerToPost, getPostById } from "../services/postService";
import { usePostSidebarContext } from "../hooks/usePostSidebarContext";

const useViewPostPage = () => {
    const { pid } = useParams();

    const { fetchPosts } = usePostSidebarContext();

    // post being rendered
    const [post, setPost] = useState<Post | null>(null);

    // keep track of if answers are a work-in-progress (i.e. being edited or created)
    const [isWipStudentAnswer, setIsWipStudentAnswer] = useState(false);
    const [isWipInstructorAnswer, setIsWipInstructorAnswer] =
        useState(false);

    // handle when the submit button is clicked when creating a new answer
    const handleOnSubmit = async (newAnswerContent: string, answerType: string) => {
        if (post && post._id) {
            try {
                // convert HTML content from React Quill to plain text before saving in database 
                const doc = new DOMParser().parseFromString(newAnswerContent, "text/html");
                const plainTextContent = doc.body.textContent || "";

                // create a new answer
                const newAnswer: Answer = {
                    postId: post._id,
                    type: answerType === "student" ? 0 : 1, // TODO - should we keep this as number or change it to a string
                    authors: [], // TODO - add the logged in user
                    content: plainTextContent,
                    dateEdited: new Date().toDateString(),
                }
                const newAnswerFromDb = await createAnswer(newAnswer);
                if (newAnswerFromDb?._id) {

                    if (answerType === "student") {
                        const updatedPost = await addAnswerToPost(post._id, newAnswerFromDb._id, "student");
                        setPost(updatedPost);
                        setIsWipStudentAnswer(false);
                        // fetch posts when new answer is added so it no longer appears as unanswered  
                        await fetchPosts();
                    } else {
                        const updatedPost = await addAnswerToPost(post._id, newAnswerFromDb._id, "instructor");
                        setPost(updatedPost);
                        setIsWipInstructorAnswer(false);
                        // fetch posts when new answer is added so it no longer appears as unanswered  
                        await fetchPosts();
                    }
                }
            }

            catch (error) {
                console.error("Error updating answer:", error);
            }
        }
    }

    useEffect(() => {
        /**
         * Function to fetch the post data based on the post's ID.
         */
        const fetchData = async () => {
            if (pid) {
                try {
                    const res = await getPostById(pid);
                    setPost(res);
                } catch (error) {
                    // eslint-disable-next-line no-console
                    console.error("Error fetching post:", error);
                }
            }
        };

        // eslint-disable-next-line no-console
        fetchData().catch((e) => console.log(e));
    }, [pid]);

    return {
        post,
        setPost,
        handleOnSubmit,
        isWipInstructorAnswer,
        setIsWipInstructorAnswer,
        isWipStudentAnswer,
        setIsWipStudentAnswer,
    }
}

export default useViewPostPage;