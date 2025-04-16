import PostBox from "../PostBox";
import FollowupDiscussions from "../FollowupDiscussions/FollowupDiscussions";
import "./ViewPostPage.css";
import WipAnswer from "../WipAnswer";
import ".././ViewPost.css";
import NewAnswerInputBox from "../NewAnswerInputBox";
import Answer from "../Answer";
import useViewPostPage from "../../hooks/useViewPostPage";


/**
 * Represents the profile page component. Routes to the right view based on the
 * logged in user and profile user relationship.
 * @returns the ProfilePage component.
 */
const ViewPostPage = () => {

  const { post,
    setPost,
    handleOnSubmit,
    isWipInstructorAnswer,
    setIsWipInstructorAnswer,
    isWipStudentAnswer,
    setIsWipStudentAnswer
  } = useViewPostPage();

  if (!post) return <div>Loading...</div>; // TODO - fix to make it the Class at a Glance page

  return (
    <div className="view-post-content">

      {/* POST COMPONENT */}
      <PostBox post={post} />

      {/* TODO - add logic for only creating a student response if the user is a student */}
      {/* only posts of type question should have the student and instructor response components */}

      {/* STUDENT ANSWER COMPONENT */}
      {post.type === 0 &&
        // if the post has a student answer, render the answer 
        (post.studentAnswer !== null ? (
          <Answer answerId={post.studentAnswer} type={"student"} setPost={setPost} />
        ) : isWipStudentAnswer ? (

          // if a student answer is being created, render the wip display
          <WipAnswer
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

      {/* TODO - add logic for only creating an instructor response if the user is an instructor */}
      {/* INSTRUCTOR ANSWER COMPONENT */}
      {post.type === 0 &&

        // if the post has an instructor answer, render it 
        (post.instructorAnswer !== null ? (
          <Answer answerId={post.instructorAnswer} type={"instructor"} setPost={setPost} />
        ) : isWipInstructorAnswer ? (

          // if an instructor answer is being created, render the wip display 
          <WipAnswer
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
        postId={post._id!!}
      />{" "}
    </div>
  );
};
export default ViewPostPage;
