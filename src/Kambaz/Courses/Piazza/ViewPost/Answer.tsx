import { useEffect, useState } from "react";
import NewStudentAnswer from "./NewStudentAnswer";
import { Answer, User } from "../../../types";
import { getAnswerById } from "../services/answerService";
import { getUser } from "../services/userService";

interface AnswerProps {
    answerId: string;
    type: string;
}

// Component for displaying an answer to a post.
export default function Answer(props: AnswerProps) {

    const { answerId, type } = props;

    // const { answerId } = props;
    const [answer, setAnswer] = useState<Answer | null>(null); // TODO - update state variable to have Response datatype

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

    useEffect(() => {
        /**
         * Function to fetch the answer data based on the answer's ID.
         */
        const fetchData = async () => {
            try {
                const res = await getAnswerById(answerId);
                setAnswer(res || null);
                const fetchedAuthors: User[] = [];
                await Promise.all(
                    res.authors.map(async authorId => {
                        const fetchedAuthor = await getUser(authorId);
                        if (fetchedAuthor._id !== undefined) {
                            fetchedAuthors.push(fetchedAuthor);
                        }
                    }));
                setAuthors(fetchedAuthors);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error('Error fetching answer:', error);
            }
        };

        // eslint-disable-next-line no-console
        fetchData().catch(e => console.log(e));
    }, [answerId]);

    return (
        <div>
            {isEditing ? (
                <NewAnswer
                    initialAnswer={answer ? answer.content : ""} // TODO idk about this
                    onSave={(updatedContent: string) => {
                        // TODO - endpoint call to update the answer object with the updatedContent on the backend 
                        if (answer) {
                            setAnswer({ ...answer, content: updatedContent });
                        }
                        setIsEditing(false);
                    }}
                    onCancel={() => setIsEditing(false)}
                />
            ) :
                <article data-id="sa_answer" className="answer" aria-label="Student Answer">
                    <header className="border-bottom container-fluid">
                        <div className="row">
                            <div className="text-left pl-0 col">
                                <h2>the {type}s' answer, </h2>
                                <span className="post_type_snippet">where {type}s collectively construct a single answer</span>
                            </div>
                        </div>
                    </header>
                    <div className="content container-fluid">
                        <div className="g-0 row">
                            <div className="col">
                                <div className="float-end dropdown">
                                    {/* actions dropdown for edit and delete */}
                                    <button
                                        aria-haspopup="true"
                                        aria-expanded={showDropdown}
                                        data-id="postActionMenuId"
                                        type="button"
                                        className="dropdown-toggle btn btn-action"
                                        onClick={() => setShowDropdown(!showDropdown)}
                                    >Actions</button>
                                    {showDropdown && (
                                        <ul className="dropdown-menu show position-absolute">
                                            <li>
                                                <button className="dropdown-item" onClick={() => setIsEditing(true)}>
                                                    Edit
                                                </button>
                                            </li>
                                            <li>
                                                <button className="dropdown-item text-danger"
                                                // onClick={handleDelete}
                                                >
                                                    Delete
                                                </button>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                                <div className="py-3 history-selection">
                                    <div id="m7h0iykfwym12r_render" data-id="renderHtmlId" className="render-html-content overflow-hidden latex_process">{answer?.content}</div> { /* TODO - replace hard-coded content with answer.content */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <footer className="border-top container-fluid">
                        <div className="row">
                            <div className="text-left align-self-center m-1 col-auto">
                                {/* edit button */}
                                {!isEditing && (
                                    <button
                                        data-id="edit_button"
                                        type="button"
                                        className="mr-2 btn btn-primary btn-sm"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        Edit
                                    </button>
                                )}
                            </div>
                            <div className="text-right col">
                                { /* we don't need last updated at, but we do need the timestamp and author of who answered it */}
                                <div className="update_text float-end" data-id="contributors">Answered on <time>{answer?.dateEdited ? formatAnswerDate(answer?.dateEdited) : ""}</time> by <span data-id="contributors">{authors.map(a => `${a.firstName} ${a.lastName}`).join(", ")}</span> { /* TODO - format when there are multiple authors */}
                                </div>
                            </div>
                        </div>
                    </footer>
                </article>
            }
        </div>
    )
}