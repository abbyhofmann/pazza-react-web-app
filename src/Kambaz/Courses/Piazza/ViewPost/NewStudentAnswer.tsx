
import { useState } from "react";
import "./ViewPost.css";
interface NewStudentAnswerProps {
    initialAnswer: string;
    onSave: (updatedAnswer: string) => void;
    onCancel: () => void;
}

// Component for adding a student answer to a post.
export default function NewStudentAnswer(props: NewStudentAnswerProps) {

    const { initialAnswer = "", onSave, onCancel } = props;
    const [answerContent, setAnswerContent] = useState<string>(initialAnswer);

    return (
        <article data-id="s_answer" className="answer" aria-label="Student Answer">
            <header className="border-bottom container-fluid">
                <div className="row">
                    <div className="text-left pl-0 col">
                        <img className="me-1" width="24px" height="24px" aria-hidden="true" src="images/studentIcon.jpg"></img>
                        <h2>the students' answer, </h2>
                        <span className="post_type_snippet">where students collectively construct a single answer</span>
                    </div>
                </div>
            </header>
            <div className="content container-fluid">
                <div className="g-0 row">
                    <div className="col">
                        {/* input box for adding a new student answer */}
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
            <footer className="border-top container-fluid">
                <div className="row">
                    <div className="text-left align-self-center m-1 col-auto">
                        <button className="btn btn-primary btn-sm me-2" onClick={() => onSave(answerContent)}>Submit</button>
                        <button className="btn btn-secondary btn-sm" onClick={onCancel}>Cancel</button>
                    </div>
                </div>
            </footer>
        </article>
    );
};