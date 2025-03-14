import "./../FollowupDiscussions.css";

export default function ResolvedButtons() {
    return (
        <div className="followup_content_wrapper">
            <div className="unresolved">
                <div className="custom-control custom-radio custom-control-inline">
                    <input
                        name="followup_resolution_resolved-button"
                        type="radio"
                        className="custom-control-input"
                        checked
                    />
                    <label
                        title=""
                        className="custom-control-label"
                    >
                        Resolved
                    </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                    <input
                        name="followup_resolution_unresolved-button"
                        type="radio"
                        className="custom-control-input"
                    />
                    <label
                        title=""
                        className="custom-control-label"
                    >
                        Unresolved
                    </label>
                </div>
            </div>
        </div>
    );
}
