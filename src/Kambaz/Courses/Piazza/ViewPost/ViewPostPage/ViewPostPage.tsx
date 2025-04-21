import PostBox from "../PostBox";
import FollowupDiscussions from "../FollowupDiscussions/FollowupDiscussions";
import "./ViewPostPage.css";
import EditingAnswer from "../EditingAnswer";
import ".././ViewPost.css";
import NewAnswerInputBox from "../NewAnswerInputBox";
import Answer from "../Answer";
import useViewPostPage from "../../hooks/useViewPostPage";
import { useState } from "react";
import { useSelector } from "react-redux";


/**
 * Represents the profile page component. Routes to the right view based on the
 * logged in user and profile user relationship.
 * @returns the ProfilePage component.
 */
const ViewPostPage = () => {
  const [isFullScreen, setFullScreen] = useState(false);

  const handleFullScreenToggle = () => {
    setFullScreen(prev => !prev);
  };

  const { post,
    setPost,
    handleOnSubmit,
    isWipInstructorAnswer,
    setIsWipInstructorAnswer,
    isWipStudentAnswer,
    setIsWipStudentAnswer
  } = useViewPostPage();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role === "FACULTY";
  // only show instructor response if there is one to see or user is faculty
  const showInstructorResponse = (isFaculty || post?.instructorAnswer);
  // only show student response if there is one to see or user is a student
  const isStudent = currentUser.role === "STUDENT";
  const showStudentResponse = (isStudent || post?.studentAnswer);

  if (!post) return <div>Loading...</div>; // TODO - fix to make it the Class at a Glance page

  return (
    <div className={`view-post-content ${isFullScreen ? 'fullscreen-content' : ''}`}
      style={{
        width: isFullScreen ? '100%' : '100vw',
        height: isFullScreen ? '100%' : 'auto',
        transition: 'all 0.3 ease',
      }}
    >

      {/* POST COMPONENT */}
      <PostBox post={post} setPost={setPost} />

      {/* STUDENT ANSWER COMPONENT */}
      {post.type === 0 && showStudentResponse &&
        // if the post has a student answer, render the answer 
        (post.studentAnswer !== null ? (
          <Answer answerId={post.studentAnswer} type={"student"} setPost={setPost} />
        ) : isWipStudentAnswer ? (

          // if a student answer is being created, render the wip display
          <EditingAnswer
            initialAnswer=""
            onSave={handleOnSubmit}
            onCancel={() => {
              setIsWipStudentAnswer(false); // hide on cancel
            }}
            type={"student"}
          />
        ) : (
          // if there is no answer and one is not being created, display the text input box 
          <NewAnswerInputBox setIsEditing={setIsWipStudentAnswer} answerAuthorType="student" />
        ))}

      {/* INSTRUCTOR ANSWER COMPONENT */}
      {post.type === 0 && showInstructorResponse &&

        // if the post has an instructor answer, render it 
        (post.instructorAnswer !== null ? (
          <Answer answerId={post.instructorAnswer} type={"instructor"} setPost={setPost} />
        ) : isWipInstructorAnswer ? (

          // if an instructor answer is being created, render the wip display 
          <EditingAnswer
            initialAnswer=""
            onSave={handleOnSubmit}
            onCancel={() => {
              setIsWipInstructorAnswer(false);
            }}
            type="instructor"
          />
        ) : (

          // if there is no answer and one is not being created, display the text input box 
          <NewAnswerInputBox setIsEditing={setIsWipInstructorAnswer} answerAuthorType="instructor" />
        ))}

      {/* FOLLOWUP DISCUSSIONS COMPONENT */}
      <FollowupDiscussions
        convoExists={post.followupDiscussions.length !== 0}
        fudIds={post.followupDiscussions}
        setPost={setPost}
        postId={post._id ?? ""}
      />{" "}
    </div>
  );
};
export default ViewPostPage;
