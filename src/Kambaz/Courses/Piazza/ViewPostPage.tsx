import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostBox from './ViewPost/PostBox';
import StudentAnswer from './ViewPost/StudentAnswer';
import InstructorAnswer from './ViewPost/InstructorAnswer';
import FollowupDiscussions from './ViewPost/FollowupDiscussions';

/**
 * Represents the profile page component. Routes to the right view based on the
 * logged in user and profile user relationship.
 * @returns the ProfilePage component.
 */
const ViewPostPage = () => {
    // const { pid } = useParams();

    //   const [selectedPost, setSelectedPost] = useState(null); // TODO - set Post type 

    //   useEffect(() => {
    //     const fetchData = async () => {
    //       if (pid) {
    //         try {
    //           const post = await getPostById(pid); 
    //           setSelectedPost(post);
    //         } catch (err) {
    //           // TODO - catch the error 
    //         }
    //       }
    //     };
    //     fetchData();
    //   }, []);

    return (
        <div className="pb-4">
            <PostBox />
            <StudentAnswer />
            <InstructorAnswer />
            <FollowupDiscussions />
        </div>
    );
};
export default ViewPostPage;
