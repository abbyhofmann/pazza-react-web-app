import InstructorIcon from "./InstructorIcon";
import "./PostSidebar.css";

interface PostListItemProps {
    _id: string;
    title: string;
    content: string;
    datePosted: string;
    instructor: number;
    displayDate: (inputDate: string) => string; // determines if the day of the week should be displayed instead of time
}

// Component for the individual post item in the sidebar. 
export default function PostListItem(props: PostListItemProps) {

    const { _id, title, content, datePosted, instructor, displayDate } = props;

    return (
        <li className="list-group-item feed_item p-3" key={_id}>
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center flex-grow-1 text-truncate">
                    {instructor === 0 && <InstructorIcon />}
                    <div className="fw-bold me-1 small post-title text-truncate">
                        {title}
                    </div>
                </div>
                <div className="small text-muted">{displayDate(datePosted)}</div>
            </div>
            <div className="text-muted small post-content">{content}</div>
        </li>
    );
}
