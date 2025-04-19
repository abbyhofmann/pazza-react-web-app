import { useEffect, useState } from 'react';
import { User, Enrollment } from '../../types';
import { getUser } from './services/userService';
import { getEnrollments } from './services/enrollmentService';

// dropdown for when selecting "instructors" for the post to option when creating a new post
const InstructorDropdown = () => {
  const [instructors, setInstructors] = useState<User[]>([]);
  const [selectedInstructors, setSelectedInstructors] = useState<User[]>([]);

  useEffect(() => {
    // fetch instructors 
    const fetchData = async () => {
        try {
      const courseEnrollments: Enrollment[] = await getEnrollments(cid);

      if (courseEnrollments) {
        const allUsers: User[] = await Promise.all(
          courseEnrollments.map(async enrollment => {
            const fetchedUser = await getUser(enrollment.user);
            return fetchedUser; 
          })
        );

        const instructorsOnly = allUsers.filter(user =>
          user.role === 'FACULTY' || user.role === 'TA'
        );

        setInstructors(instructorsOnly);
      }
    } catch (error) {
      console.error('Error fetching enrollments:', error);
    }
    };

    // eslint-disable-next-line no-console
    fetchData().catch(e => console.log(e));
  }, [cid]);

  const options = instructors.map(instr => ({
    value: instr.id,
    label: instr.name
  }));

  return (
    <div className="col">
      <Select
        options={options}
        isMulti
        placeholder="Enter one or more names..."
        onChange={(selectedOptions) => {
          setSelectedInstructors(selectedOptions as any); // or handle appropriately
        }}
      />
      <p className="helper-text mb-0 ml-2 inline">
        Select "Instructors" to include all instructors.
      </p>
    </div>
  );
};

export default InstructorDropdown;
