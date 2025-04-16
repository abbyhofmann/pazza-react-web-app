interface ActionsDropdownProps {
    showDropdown: boolean;
    setShowDropdown: (newShowDropdown: boolean) => void;
    setIsEditing: (newIsEditing: boolean) => void;
    handleDelete: () => void;
}

// TODO - only creator and instructors should be allowed to edit/delete an element 
// dropdown component for editing and deleting; used for answers, followup discussions, and replies
export default function ActionsDropdown(props: ActionsDropdownProps) {
    const { showDropdown, setShowDropdown, setIsEditing, handleDelete } = props;

    return (
        <div className="float-end dropdown">
            {/* actions dropdown for edit and delete */}
            <button
                aria-haspopup="true"
                aria-expanded={showDropdown}
                data-id="postActionMenuId"
                type="button"
                className="dropdown-toggle btn btn-action"
                onClick={() => setShowDropdown(!showDropdown)}
            >Actions</button>
            {showDropdown && (
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
        </div>
    )
}