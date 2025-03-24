
import { useState } from "react";
import "./ViewPost.css";

interface NewAnswerProps {
    initialAnswer: string | null;
    onSave: (updatedAnswer: string) => void;
    onCancel: () => void;
    type: string;
    editing: boolean;
}

// Component for adding a new answer to a post.
export default function NewAnswer(props: NewAnswerProps) {

    const { initialAnswer = "", onSave, onCancel, type, editing } = props;
    const [answerContent, setAnswerContent] = useState<string>(initialAnswer ? initialAnswer : ""); // TODO idk if this is right 

    return (
        <article data-id="s_answer" className="answer" aria-label="Student Answer">
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
                        {/* input box for adding a new answer */}
                        <input
                            placeholder="Click to start off the wiki answer"
                            id="s_answerPlaceholderId"
                            className="my-3 form-control"
                            value={answerContent}
                            onChange={(e) => setAnswerContent(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            {editing &&
                <footer className="border-top container-fluid">
                    <div className="row">
                        <div className="text-left align-self-center m-1 col-auto">
                            <button className="btn btn-primary btn-sm me-2" onClick={() => onSave(answerContent)}>Submit</button>
                            <button className="btn btn-secondary btn-sm" onClick={onCancel}>Cancel</button>
                        </div>
                    </div>
                </footer>
            }
        </article>
    );
};