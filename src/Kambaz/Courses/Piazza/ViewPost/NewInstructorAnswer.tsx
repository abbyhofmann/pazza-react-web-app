import "./ViewPost.css";

// Component for adding a new instructor answer to a post.
export default function NewInstructorAnswer() {
    return (
        <article data-id="s_answer" className="answer" aria-label="Instructor Answer">
            <header className="border-bottom container-fluid">
                <div className="row">

                    <div className="text-left pl-0 col">
                        <h2>the instructors' answer, </h2>
                        <span className="post_type_snippet">where instructors collectively construct a single answer</span>
                    </div>
                </div>
            </header>
            <div className="content container-fluid"><div className="g-0 row">
                <div className="col">
                    {/* input box to add a new instructor answer */}
                    <input placeholder="Click to start off the wiki answer" id="s_answerPlaceholderId" className="my-3 form-control" />
                </div>
            </div>
            </div>
        </article>
    );
};