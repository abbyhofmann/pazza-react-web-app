import { User } from '../../types';
import useInstructorsDropdown from './hooks/useInstructorsDropdown';

interface InstructorDropdownProps {
    selectedInstructors: User[];
    setSelectedInstructors: React.Dispatch<React.SetStateAction<User[]>>;
}

// dropdown for when selecting "instructors" for the post to option when creating a new post
const InstructorDropdown = (props: InstructorDropdownProps) => {

    const { selectedInstructors, setSelectedInstructors } = props;

    const {
        showDropdown,
        setShowDropdown,
        instructors,
        handleOnClick
    } = useInstructorsDropdown(setSelectedInstructors);

    return (
        <div className="float-end dropdown">
            <button
                aria-haspopup="true"
                aria-expanded={showDropdown}
                data-id="postActionMenuId"
                type="button"
                className="dropdown-toggle btn wd-dark-grey"
                onClick={() => setShowDropdown(!showDropdown)}
                style={{
                    fontSize: "14px",
                    color: "dark-gray"
                }}
            >Select Instructors</button>
            {showDropdown && (

                <ul className="dropdown-menu show position-absolute">
                    {instructors.map((instructor: User) => {
                        const fullName = `${instructor.firstName} ${instructor.lastName}`;
                        const isSelected = selectedInstructors.some(i => i._id === instructor._id);

                        return (
                            <li key={instructor._id}>
                                <button
                                    className={`dropdown-item ${isSelected ? 'active' : ''}`}
                                    onClick={() => handleOnClick(isSelected, instructor)}
                                    style={{
                                        fontSize: "14px",
                                        color: "dark-gray"
                                    }}
                                >
                                    {fullName}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            )}

            {/* selected instructors displayed */}
            {selectedInstructors.length > 0 && (
                <div className="d-flex flex-wrap align-items-center">
                    {selectedInstructors.map(instructor => (
                        <div
                            key={instructor._id}
                            className="me-2 mb-1 px-2 py-1 border rounded"
                            style={{
                                fontSize: "12px",
                                backgroundColor: "#f8f9fa",
                                color: "#333"
                            }}
                        >
                            {instructor.firstName} {instructor.lastName}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InstructorDropdown;
