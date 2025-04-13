import { useEffect, useState } from "react";
import { Answer, User } from "../../../types";
import { getAnswerById, updateAnswer } from "../services/answerService";
import { getUser } from "../services/userService";

const useAnswer = (answerId: string) => {

    const [answer, setAnswer] = useState<Answer | null>(null);

    // keep track of if the user is editing the answer 
    const [isEditing, setIsEditing] = useState<boolean>(false);

    // keep track of if dropdown is showing 
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    // author(s) of the answer 
    const [authors, setAuthors] = useState<User[]>([]);

    // formats the date for the answer component 
    function formatAnswerDate(dateString: string): string {
        const date = new Date(dateString);

        return `${date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })} at ${date.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}`;
    }

    // handle saving an answer when it is being edited 
    const handleOnSave = async (updatedContent: string) => {

        try {
            // convert HTML content from React Quill to plain text before saving in database 
            const doc = new DOMParser().parseFromString(updatedContent, "text/html");
            const plainTextContent = doc.body.textContent || "";

            if (answer && answer._id) {
                // update existing answer
                const updatedAnswer = await updateAnswer(answer._id, plainTextContent);
                setAnswer({ ...answer, content: updatedAnswer.content });
            }
            else {
                throw new Error("Cannot update an answer that doesn't exist");
            }
        } catch (error) {
            console.error("Error updating answer:", error);
        }
        setIsEditing(false);
    }

    useEffect(() => {
        /**
         * Function to fetch the answer data based on the answer's ID.
         */
        const fetchData = async () => {
            try {
                const res = await getAnswerById(answerId);
                if (res) {
                    setAnswer(res);
                }

            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Error fetching answer:', error);
            }
        };

        // eslint-disable-next-line no-console
        fetchData().catch(e => console.log(e));
    }, [answerId]);

    useEffect(() => {
        if (!answer?.authors) return;

        /**
         * Function to fetch the authors of an answer, based on the answer's list of author ids.
         */
        const fetchAuthors = async () => {
            try {
                const fetchedAuthors: User[] = [];
                await Promise.all(
                    answer.authors.map(async authorId => {
                        const fetchedAuthor = await getUser(authorId);
                        if (fetchedAuthor._id !== undefined) {
                            fetchedAuthors.push(fetchedAuthor);
                        }
                    }));
                setAuthors(fetchedAuthors);
            } catch (error) {
                console.error("Error fetching authors: ", error);
            }
        };

        fetchAuthors();

    }, [answer?.authors])

    return {
        isEditing,
        setIsEditing,
        answer,
        setAnswer,
        handleOnSave,
        showDropdown,
        setShowDropdown,
        formatAnswerDate,
        authors,
        setAuthors
    }
}

export default useAnswer;