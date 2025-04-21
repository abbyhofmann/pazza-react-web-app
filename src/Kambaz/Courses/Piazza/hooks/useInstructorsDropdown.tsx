import { useParams } from "react-router";
import { Enrollment, User } from "../../../types";
import { useEffect, useState } from "react";
import { getEnrollments } from "../services/enrollmentService";
import { getUser } from "../services/userService";

const useInstructorsDropdown = (setSelectedInstructors: React.Dispatch<React.SetStateAction<User[]>>) => {
    const { cid } = useParams();

    const [instructors, setInstructors] = useState<User[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    useEffect(() => {
        // fetch faculty and TAs to populate the dropdown 
        const fetchData = async () => {
            try {
                // get all the enrollments of the course 
                const courseEnrollments: Enrollment[] = await getEnrollments(cid ?? "");

                if (courseEnrollments) {
                    // get all the users in the course from the enrollments 
                    const allUsers: User[] = await Promise.all(
                        courseEnrollments.map(async enrollment => {
                            const fetchedUser = await getUser(enrollment.user);
                            return fetchedUser;
                        })
                    );

                    // filter the users to only have faculty and TAs
                    const instructorsOnly = allUsers.filter(user =>
                        user.role === 'FACULTY' || user.role === 'TA'
                    );

                    setInstructors(instructorsOnly);
                }
            } catch (error) {
                console.error('Error fetching instructors:', error);
            }
        };

        fetchData().catch(e => console.log(e));
    }, [cid]);

    const handleOnClick = async (isSelected: boolean, instructor: User) => {
        if (isSelected) {
            // remove from selected list
            setSelectedInstructors((prev: User[]) =>
                prev.filter(i => i._id !== instructor._id)
            );
        } else {
            // add to selected list
            setSelectedInstructors((prev: User[]) => [...prev, instructor]);
        }
    }
    return {
        showDropdown,
        setShowDropdown,
        instructors,
        handleOnClick
    }
}

export default useInstructorsDropdown;