export default function NewFollowupDiscussions() {
    return (
        <article className="answer followup_container" aria-label="Followup Discussions">
            <header className="container-fluid border-bottom">
                <div className="align-items-center row">
                    <div className="text-left col">
                        <span className="mr-2">followup discussions </span>
                        <span className="post_type_snippet p-0 align-middle">for lingering questions and comments</span>
                    </div>
                </div>
            </header>
            <div className="content container-fluid">
                <div className="row">
                    <div className="pt-2 pb-3 col">
                        {/* input box to start a new followup dicussion */}
                        <label htmlFor="followup-box">Start a new followup discussion</label>
                        <input id="followup-box" type="text" className="form-control ng-pristine ng-valid" placeholder="Compose a new followup discussion" />
                    </div>
                </div>
            </div>
        </article>
    )
}