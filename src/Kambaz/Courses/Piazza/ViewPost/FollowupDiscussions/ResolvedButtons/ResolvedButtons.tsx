import { markDiscussionResolved, markDiscussionUnresolved } from "../../../services/followupDiscussionService";
import "./ResolvedButtons.css";

export interface ResolvedButtonsProps {
    fudId: string;
    resolved: boolean;
    setResolved: (resolvedStatus: boolean) => void;
}

export default function ResolvedButtons(props: ResolvedButtonsProps) {

    const { fudId, resolved, setResolved } = props;

    const handleClickResolve = async () => {
        try {
            const updatedDiscussion = await markDiscussionResolved(fudId);
            setResolved(true);
        } catch (error) {
            console.error("Error updating discussion resolved:", error);
        }
    }

    const handleClickUnresolve = async () => {
        try {
            const updatedDiscussion = await markDiscussionUnresolved(fudId);
            setResolved(false);
        } catch (error) {
            console.error("Error marking discussion unresolved:", error);
        }
    }

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
                        onChange={handleClickResolve}
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
                        onChange={handleClickUnresolve}
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
