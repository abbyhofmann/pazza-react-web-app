import { type Answer } from "../../../types";
import WipAnswer from "./WipAnswer";
import useAnswer from "../hooks/useAnswer";
import ActionsDropdown from "./ActionsDropdown";

interface AnswerProps {
    answerId: string;
    type: string;
    setPost: (post: any) => void;
}

// Component for displaying an answer to a post.
export default function Answer(props: AnswerProps) {

    const { answerId, type, setPost } = props;

    const {
        isEditing,
        setIsEditing,
        answer,
        handleOnSave,
        showDropdown,
        setShowDropdown,
        formatAnswerDate,
        authors,
        handleDelete
    } = useAnswer(answerId, type, setPost);

    return (
        <div>
            {isEditing ? (
                <WipAnswer
                    initialAnswer={answer ? answer.content : ""} // TODO improve this check 
                    onSave={handleOnSave}
                    onCancel={() => { setIsEditing(false); setShowDropdown(false); }}
                    type={type}
                />
            ) : (
                <article data-id="sa_answer" className="answer" aria-label="Student Answer">
                    <header className="border-bottom container-fluid">
                        <div className="row">
                            <div className="mx-0 col-auto">
                                <img className="" width="18px" height="18px" aria-hidden="true" src={type === "student" ? "images/studentIcon.jpg" : "images/instructorIcon.jpg"} />
                            </div>
                            <div className="text-left pl-0 col">
                                <h2>the {type}'s answer, </h2>
                                <span className="post_type_snippet">where {type}s collectively construct a single answer</span>
                            </div>
                        </div>
                    </header>
                    <div className="content container-fluid">
                        <div className="g-0 row">
                            <div className="col">
                                {/* dropdown for editing and deleting */}
                                <ActionsDropdown showDropdown={showDropdown} setShowDropdown={setShowDropdown} setIsEditing={setIsEditing} handleDelete={handleDelete} />
                                <div className="py-3 history-selection">
                                    <div id="m7h0iykfwym12r_render" data-id="renderHtmlId" className="render-html-content overflow-hidden latex_process">{answer?.content}</div>
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
                                <div className="update_text float-end" data-id="contributors">Answered on <time>{answer?.dateEdited ? formatAnswerDate(answer?.dateEdited) : ""}</time> by <span data-id="contributors">{authors.map(a => `${a.firstName} ${a.lastName}`).join(", ")}</span>
                                </div>
                            </div>
                        </div>
                    </footer>
                </article>
            )}
        </div>
    )
}