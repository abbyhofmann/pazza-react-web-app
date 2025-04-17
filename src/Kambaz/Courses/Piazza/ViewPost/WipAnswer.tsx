
import { useState } from "react";
import "./ViewPost.css";
import EditorComponent from "./EditorComponent";

interface WipAnswerProps {
    initialAnswer: string;
    onSave: (updatedAnswer: string, type: string) => void;
    onCancel: () => void;
    type: string;
}

// Component for rendering view for editing (updating or adding a new) answer.
export default function WipAnswer(props: WipAnswerProps) {

    const { initialAnswer, onSave, onCancel, type } = props;

    // variable to keep track of the answer's content
    const [answerContent, setAnswerContent] = useState<string>(initialAnswer);

    // variable for keeping track of displaying the rich text editor; if there is an answer, then clicking "edit" should take you directly to 
    // the editor, but if there is no answer, then you have to click an input box and then the editor will pop up 
    const [editorOpen, setEditorOpen] = useState<boolean>(true);

    return (
        <article data-id="s_answer" className="answer" aria-label="Student Answer">
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
                        {!editorOpen ? (
                            // input box - when this is clicked, the rich text editor appears
                            <input
                                placeholder="Click to start off the wiki answer"
                                id="s_answerPlaceholderId"
                                className="my-3 form-control"
                                value={answerContent}
                                onFocus={() => setEditorOpen(true)}
                                readOnly
                            />
                        ) : (
                            <EditorComponent content={answerContent} setContent={setAnswerContent} />
                        )}
                    </div>
                </div>
            </div>
            {/* save and cancel buttons only appear when user is editing */}
            {editorOpen &&
                <footer className="border-top container-fluid">
                    <div className="row">
                        <div className="text-left align-self-center m-1 col-auto">
                            <button className="btn btn-primary btn-sm me-2" onClick={() => onSave(answerContent, type)}>Submit</button>
                            <button className="btn btn-secondary btn-sm" onClick={onCancel}>Cancel</button>
                        </div>
                    </div>
                </footer>
            }
        </article>
    );
};