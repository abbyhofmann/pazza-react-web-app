// Component for displaying a student answer to a post.
export default function StudentAnswer() {
    // TODO - add prop for the student answer that will come from the post object
    return (
        <article data-id="i_answer" className="answer" aria-label="Student Answer">
            <header className="border-bottom container-fluid">
                <div className="row">
                    <div className="text-left pl-0 col">
                        <h2>the students' answer, </h2>
                        <span className="post_type_snippet">where students collectively construct a single answer</span>
                    </div>
                </div>
            </header>
            <div className="content container-fluid">
                <div className="g-0 row">
                    <div className="col">
                        <div className="py-3 history-selection">
                            <div id="m7h0iykfwym12r_render" data-id="renderHtmlId" className="render-html-content overflow-hidden latex_process">here is a sample student answer</div>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="border-top container-fluid">
                <div className="row">
                    <div className="text-left align-self-center m-1 col-auto">
                        {/* edit button */}
                        <button data-id="edit_button" type="button" className="mr-2 btn btn-primary btn-sm">Edit</button> { /* TODO - edit should only available to creator of post and instructors */}
                    </div>
                    <div className="text-right col">
                        { /* we don't need last updated at, but we do need the timestamp and author of who answered it */}
                        <div className="update_text float-end" data-id="contributors">Answered on <time>February 28, 2025 at 8:11 am</time> by <span data-id="contributors">Abby Hofmann</span>
                        </div>
                    </div>
                </div>
            </footer>
        </article>
    )
}