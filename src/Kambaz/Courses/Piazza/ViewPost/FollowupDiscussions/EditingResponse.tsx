
import { useState } from "react";
import "./../ViewPost.css";
import EditorComponent from "../EditorComponent";

interface EditingResponseProps {
    initialFud: string;
    onSave: (updatedFud: string) => void;
    onCancel: () => void;
}

// Component for rendering view for editing a followup discussion.
export default function EditingResponse(props: EditingResponseProps) {

    const { initialFud, onSave, onCancel } = props;

    // variable to keep track of the answer's content
    const [fudContent, setFudContent] = useState<string>(initialFud);

    return (
        <article data-id="fud" className="answer" aria-label="Followup Discussion">
            <div className="content container-fluid">
                <EditorComponent content={fudContent} setContent={setFudContent} />
            </div>
            {/* save and cancel buttons only appear when user is editing */}
            <footer className="border-top container-fluid">
                <div className="row">
                    <div className="text-left align-self-center m-1 col-auto">
                        <button className="btn btn-primary btn-sm me-2" onClick={() => onSave(fudContent)}>Submit</button>
                        <button className="btn btn-secondary btn-sm" onClick={onCancel}>Cancel</button>
                    </div>
                </div>
            </footer>
        </article>
    );
};