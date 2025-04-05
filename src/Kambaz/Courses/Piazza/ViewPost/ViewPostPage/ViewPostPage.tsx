import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PostBox from "../PostBox";
import FollowupDiscussions from "../FollowupDiscussions/FollowupDiscussions";
import "./ViewPostPage.css";
import { Answer as AnswerType, Post } from "../../../../types";
import { addAnswerToPost, getPostById } from "../../services/postService";
import WipAnswer from "../WipAnswer";
import ".././ViewPost.css";
import NewAnswerInputBox from "../NewAnswerInputBox";
import { createAnswer } from "../../services/answerService";
import Answer from "../Answer";


/**
 * Represents the profile page component. Routes to the right view based on the
 * logged in user and profile user relationship.
 * @returns the ProfilePage component.
 */
const ViewPostPage = () => {
  const { pid } = useParams();

  // post being rendered
  const [post, setPost] = useState<Post | null>(null);

  // keep track of if answers are a work-in-progress (i.e. being edited or created)
  const [isWipStudentAnswer, setIsWipStudentAnswer] = useState(false);
  const [isWipInstructorAnswer, setIsWipInstructorAnswer] =
    useState(false);

  // handle when the submit button is clicked when creating a new answer
  const handleOnSubmit = async (newAnswerContent: string, answerType: string) => {
    if (post && post._id) {
      try {
        // convert HTML content from React Quill to plain text before saving in database 
        const doc = new DOMParser().parseFromString(newAnswerContent, "text/html");
        const plainTextContent = doc.body.textContent || "";

        // create a new answer
        const newAnswer: AnswerType = {
          postId: post._id,
          type: answerType === "student" ? 0 : 1, // TODO - should we keep this as number or change it to a string
          authors: [], // TODO - add the logged in user
          content: plainTextContent,
          dateEdited: new Date().toDateString(),
        }
        const newAnswerFromDb = await createAnswer(newAnswer);
        if (newAnswerFromDb?._id) {

          // todo - add answer to post on the backend 
          if (answerType === "student") {
            const updatedPost = await addAnswerToPost(post._id, newAnswerFromDb._id, "student");
            setPost(updatedPost);
            setIsWipStudentAnswer(false); // hide after submit
          } else {
            const updatedPost = await addAnswerToPost(post._id, newAnswerFromDb._id, "instructor");
            setPost(updatedPost);
            setIsWipInstructorAnswer(false);
          }
        }
      }

      catch (error) {
        console.error("Error updating answer:", error);
      }
    }
  }

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
          console.error("Error fetching post:", error);
        }
      }
    };

    // eslint-disable-next-line no-console
    fetchData().catch((e) => console.log(e));
  }, [pid]);

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
          <Answer answerId={post.studentAnswer} type={"student"} />
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
          <Answer answerId={post.instructorAnswer} type={"instructor"} />
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
