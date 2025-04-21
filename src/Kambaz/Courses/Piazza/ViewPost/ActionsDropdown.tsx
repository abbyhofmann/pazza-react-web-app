import { useSelector } from "react-redux";

interface ActionsDropdownProps {
    showDropdown: boolean;
    setShowDropdown: (newShowDropdown: boolean) => void;
    setIsEditing: (newIsEditing: boolean) => void;
    handleDelete: () => void;
    authors: string[]; // id of the author of the parent component
}

// TODO - only creator and instructors should be allowed to edit/delete an element 
// dropdown component for editing and deleting; used for answers, followup discussions, and replies
export default function ActionsDropdown(props: ActionsDropdownProps) {
    const { showDropdown, setShowDropdown, setIsEditing, handleDelete, authors } = props;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser.role === "FACULTY";
    const isAuthor = authors.includes(currentUser._id);
    const canEdit = isFaculty || isAuthor;

    return (
        <div className="float-end dropdown">
            <button
                aria-haspopup="true"
                aria-expanded={showDropdown}
                data-id="postActionMenuId"
                type="button"
                className="dropdown-toggle btn"
                onClick={() => setShowDropdown(!showDropdown)}
            >Actions</button>
            {showDropdown && canEdit && (
                <ul className="dropdown-menu show position-absolute">
                    <li>
                        <button className="dropdown-item" onClick={() => setIsEditing(true)}>
                            Edit
                        </button>
                    </li>
                    <li>
                        <button className="dropdown-item text-danger"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </li>
                </ul>
            )}
            {showDropdown && !canEdit &&
                <ul className="dropdown-menu show position-absolute">
                    <li>
                        <button className="dropdown-item">
                            No Action
                        </button>
                    </li>
                </ul>}
            {/* TODO: I can also just hide the edit button if we can't edit! */}
        </div>
    )
}