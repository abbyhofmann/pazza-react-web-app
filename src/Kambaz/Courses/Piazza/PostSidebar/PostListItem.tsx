
import React from "react";
import InstructorIcon from "../InstructorIcon";
import "./PostSidebar.css";

interface PostListItemProps {
    _id: string;
    title: string;
    content: string;
    datePosted: string;
    instructor: boolean;
    displayDate: (inputDate: string) => string; // determines if the day of the week should be displayed instead of time
    onClick: () => void;
    isSelected: boolean;
}

// Component for the individual post item in the sidebar. 
export default function PostListItem(props: PostListItemProps) {

    const { _id, title, content, datePosted, instructor, displayDate, onClick, isSelected } = props;

    return (
        <li className={`list-group-item feed_item p-3 ${isSelected ? "selected" : ""}`} key={_id} onClick={onClick} style={{ cursor: 'pointer' }}>
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center flex-grow-1 text-truncate">
                    {instructor === true && <InstructorIcon />}
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