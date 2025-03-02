import "./ViewPost.css";

export default function NewStudentAnswer() {
    return (
        <article data-id="s_answer" className="answer" aria-label="Student Answer">
            <header className="border-bottom container-fluid">
                <div className="row">

                    <div className="text-left pl-0 col">
                        <h2>the students' answer, </h2>
                        <span className="post_type_snippet">where students collectively construct a single answer</span>
                    </div>
                </div>
            </header>
            <div className="content container-fluid"><div className="g-0 row">
                <div className="col">
                    {/* input box for adding a new student answer */}
                    <input placeholder="Click to start off the wiki answer" id="s_answerPlaceholderId" className="my-3 form-control" />
                </div>
            </div>
            </div>
        </article>
    );
};