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
import { Post } from '../../../../types';
import { getPostById } from '../../services/postService';

/**
 * Represents the profile page component. Routes to the right view based on the
 * logged in user and profile user relationship.
 * @returns the ProfilePage component.
 */
const ViewPostPage = () => {
  const { pid } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    /**
     * Function to fetch the post data based on the post's ID.
     */
    const fetchData = async () => {
      if (pid) {
        try {
          const res = await getPostById(pid);
          setPost(res);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Error fetching post:', error);
        }
      }
    };

    // eslint-disable-next-line no-console
    fetchData().catch(e => console.log(e));
  }, [pid]);

  if (!post) return <div>Loading...</div>; // TODO - fix to make it the Class at a Glance page

  return (
    <div className="view-post-content">
      <PostBox post={post} />
      {/* TODO - add logic for only creating a student response if the user is a student */}
      {/* only posts of type question should have the student and instructor response components */}
      {post.type === 0 && (post.studentAnswer !== null ? <StudentAnswer studentAnswerId={post.studentAnswer} /> : <NewStudentAnswer initialAnswer=""
        onSave={(newAnswer) => {
          // TODO: send newAnswer to the backend and update post state
          setPost((prevPost) => prevPost ? { ...prevPost, studentResponse: newAnswer } : null);
        }}
        onCancel={() => { }} />)}
      {/* TODO - add logic for only creating an instructor response if the user is an instructor */}
      {post.type === 0 && (post.instructorAnswer !== null ? <InstructorAnswer instructorAnswerId={post.instructorAnswer} /> : <NewInstructorAnswer />)}
      {post.followupDiscussions.length !== 0 ? <FollowupDiscussions /> : <NewFollowupDiscussions />}
    </div>
  );
};
export default ViewPostPage;
