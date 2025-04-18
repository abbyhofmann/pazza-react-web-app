import ReactQuill from "react-quill";

interface EditorComponentProps {
    content: string;
    setContent: (newContent: string) => void;
}

// Component for the rich text editor used for adding and editing elements of a post.
export default function EditorComponent(props: EditorComponentProps) {

    const { content, setContent } = props;

    return (
        <div>
            <ReactQuill
                theme="snow"
                className="custom-editor"
                value={content}
                onChange={setContent}
            />
        </div>

    )
}