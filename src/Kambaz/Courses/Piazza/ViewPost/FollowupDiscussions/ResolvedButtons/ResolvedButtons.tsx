import "./ResolvedButtons.css";

export interface ResolvedButtonsProps {
    resolved: boolean;
    setResolved: (resolvedStatus: boolean) => void;
}

export default function ResolvedButtons(props: ResolvedButtonsProps) {

    const { resolved, setResolved } = props;

    return (
        <div className="">
            <div className={`${resolved ? "resolved" : "unresolved"} resolved-buttons`}>
                <div className="custom-control custom-radio custom-control-inline">
                    <input
                        // key added to force a re-render and show the radio button selection
                        key={String(resolved)}
                        name="followup_resolution"
                        type="radio"
                        className="custom-control-input"
                        checked={resolved}
                        onChange={() => (setResolved(true))}
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
                        key={String(resolved)}
                        name="followup_resolution"
                        type="radio"
                        className="custom-control-input"
                        checked={!resolved}
                        onChange={() => (setResolved(false))}
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
