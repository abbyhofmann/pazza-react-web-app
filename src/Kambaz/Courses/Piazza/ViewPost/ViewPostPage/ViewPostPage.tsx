import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PostBox from '../PostBox';
import NewStudentAnswer from '../NewStudentAnswer';
import InstructorAnswer from '../InstructorAnswer';
import NewFollowupDiscussions from '../NewFollowupDiscussions';
import StudentAnswer from '../StudentAnswer';
import NewInstructorAnswer from '../NewInstructorAnswer';
import FollowupDiscussions from '../FollowupDiscussions';
import "./ViewPostPage.css";

/**
 * Represents the profile page component. Routes to the right view based on the
 * logged in user and profile user relationship.
 * @returns the ProfilePage component.
 */
const ViewPostPage = () => {
    const { pid } = useParams();
    const [post, setPost] = useState<{ _id: string; folderId: string; authorId: string; datePosted: string; type: number; instructor: number; title: string; content: string; followUpQuestions: string; studentResponse: string; instructorResponse: string; viewers: string; courseId: string; } | null>(null);

    useEffect(() => {
        // TODO - fetch the post details via server based on the postId
        setPost({ _id: pid!, folderId: 'fid', authorId: 'aid', datePosted: '2025-02-15T09:30:00.000Z', type: 1, instructor: 0, title: 'Do we need images for Dashboard??', content: 'Changing the data source for dashboard now has no photos rendering for each course, do we need to fix this by using assets/images/?', followUpQuestions: '', studentResponse: 'h', instructorResponse: 'haiii', viewers: '', courseId: '4550' });
    }, [pid]);

    // useEffect(() => {
    //     /**
    //      * Function to fetch the post data based on the post's ID.
    //      */
    //     const fetchData = async () => {
    //       try {
    //         const res = await getPostById(pid);
    //         setPost(res || null);
    //       } catch (error) {
    //         // eslint-disable-next-line no-console
    //         console.error('Error fetching post:', error);
    //       }
    //     };

    //     // eslint-disable-next-line no-console
    //     fetchData().catch(e => console.log(e));
    //   }, [postId]);

    if (!post) return <div>Loading...</div>; // TODO - fix to make it the Class at a Glance page

    return (
        <div className="view-post-content">
            <PostBox post={post} />
            {/* TODO - add logic for only creating a student response if the user is a student */}
            {/* only posts of type question should have the student and instructor response components */}
            {post.type === 0 && (post.studentResponse !== "" ? <StudentAnswer studentAnswerId={post.studentResponse} /> : <NewStudentAnswer initialAnswer=""
                onSave={(newAnswer) => {
                    // TODO: send newAnswer to the backend and update post state
                    setPost((prevPost) => prevPost ? { ...prevPost, studentResponse: newAnswer } : null);
                }}
                onCancel={() => { }} />)}
            { /* TODO - equality check may need to change once we have the post data object finalized */}
            {/* TODO - add logic for only creating an instructor response if the user is an instructor */}
            {post.type === 0 && (post.instructorResponse !== "" ? <InstructorAnswer instructorAnswerId={post.instructorResponse} /> : <NewInstructorAnswer />)}
            {post.followUpQuestions !== "" ? <FollowupDiscussions /> : <NewFollowupDiscussions />}
        </div>
    );
};
export default ViewPostPage;
