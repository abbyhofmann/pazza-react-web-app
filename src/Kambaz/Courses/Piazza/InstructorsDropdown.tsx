import { useEffect, useState } from 'react';
import { User, Enrollment } from '../../types';
import { getUser } from './services/userService';
import { getEnrollments } from './services/enrollmentService';
import { useParams } from 'react-router';

// dropdown for when selecting "instructors" for the post to option when creating a new post
const InstructorDropdown = () => {
    const { cid } = useParams();

    const [instructors, setInstructors] = useState<User[]>([]);
    const [selectedInstructors, setSelectedInstructors] = useState<User[]>([]);

    useEffect(() => {
        // fetch faculty and TAs to populate the dropdown 
        const fetchData = async () => {
            try {
                // get all the enrollments of the course 
                const courseEnrollments: Enrollment[] = await getEnrollments(cid);

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

        // eslint-disable-next-line no-console
        fetchData().catch(e => console.log(e));
    }, [cid]);

    return (
        <div className="col">
  <label htmlFor="instructorSelect" className="form-label">Select Instructors</label>
  <select id="instructorSelect" className="form-select" multiple aria-label="Select Instructors">
    
  </select>
  <p className="helper-text mb-0 ml-2 inline">Select "Instructors" to include all instructors.</p>
</div>
    );
};

export default InstructorDropdown;
