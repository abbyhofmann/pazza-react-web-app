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
    const { pid } = useParams();
    const [post, setPost] = useState<{ _id: string; folderId: string; authorId: string; datePosted: string; type: number; instructor: number; title: string; content: string; followUpQuestions: string; studentResponse: string; instructorResponse: string; viewers: string; courseId: string;} | null>(null);

    useEffect(() => {
        // TODO - fetch the post details via server based on the postId
        setPost({ _id: pid!, folderId: 'fid', authorId: 'aid', datePosted: '2025-02-15T09:30:00.000Z', type: 0, instructor: 1, title: 'Do we need images for Dashboard??', content: 'Changing the data source for dashboard now has no photos rendering for each course, do we need to fix this by using assets/images/?', followUpQuestions: '', studentResponse: '', instructorResponse: '', viewers: '', courseId: '4550'});
      }, [pid]);

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

    if (!post) return <div>Loading...</div>; // TODO - fix to make it the Class at a Glance page

    return (
        <div className="pb-4">
            <PostBox post={post}/>
            <StudentAnswer />
            <InstructorAnswer />
            <FollowupDiscussions />
        </div>
    );
};
export default ViewPostPage;
