import "./ResolvedButtons.css";

export default function ResolvedButtons() {
    return (
        <div className="">
            {/* TODO - add logic to toggle between resolved and unresolved selection */}
            <div className="unresolved resolved-buttons">
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
