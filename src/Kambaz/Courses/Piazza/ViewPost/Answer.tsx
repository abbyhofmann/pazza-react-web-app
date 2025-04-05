import { type Answer } from "../../../types";
import WipAnswer from "./WipAnswer";
import useAnswer from "../hooks/useAnswer";

interface AnswerProps {
    answerId: string;
    type: string;
}

// Component for displaying an answer to a post.
export default function Answer(props: AnswerProps) {

    const { answerId, type } = props;

    const {
        isEditing,
        setIsEditing,
        answer,
        handleOnSave,
        showDropdown,
        setShowDropdown,
        formatAnswerDate,
        authors,
    } = useAnswer(answerId);

    return (
        <div>
            {isEditing ? (
                <WipAnswer
                    initialAnswer={answer ? answer.content : ""} // TODO improve this check 
                    onSave={handleOnSave}
                    onCancel={() => { setIsEditing(false) }}
                    type={type}
                />
            ) : (
                <article data-id="sa_answer" className="answer" aria-label="Student Answer">
                    <header className="border-bottom container-fluid">
                        <div className="row">
                            <div className="text-left pl-0 col">
                                <h2>the {type}'s answer, </h2>
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