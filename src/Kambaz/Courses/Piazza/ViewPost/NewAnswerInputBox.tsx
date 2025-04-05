import "./ViewPost.css";

interface NewAnswerInputProps {
    setIsEditing: (editing: boolean) => void;
    answerAuthorType: string;
}

// Component for starting a new answer - when the input box is clicked on, boolean changes which causes the rich text editor to render.
export default function NewAnswerInputBox(props: NewAnswerInputProps) {

    const { setIsEditing, answerAuthorType } = props;

    return (
        <article data-id={`${answerAuthorType}_answer`} className="answer" aria-label={`${answerAuthorType} Answer`}>
            <header className="border-bottom container-fluid">
                <div className="row">
                    <div className="text-left pl-0 col">
                        <h2>the {answerAuthorType}'s answer, </h2>
                        <span className="post_type_snippet">where {answerAuthorType}s collectively construct a single answer</span>
                    </div>
                </div>
            </header>
            <div className="content container-fluid">
                <div className="g-0 row">
                    <div className="col">

                        <input
                            placeholder="Click to start off the wiki answer"
                            id={`${answerAuthorType}_answerPlaceholderId`}
                            className="my-3 form-control"
                            value=""
                            onFocus={() => setIsEditing(true)} // editor appears when input box is clicked
                            readOnly
                        />
                    </div>
                </div>
            </div>
        </article>
    )
}