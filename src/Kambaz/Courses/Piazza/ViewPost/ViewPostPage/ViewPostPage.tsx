import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PostBox from "../PostBox";
import Answer from "../Answer";
import FollowupDiscussions from "../FollowupDiscussions/FollowupDiscussions";
import "./ViewPostPage.css";
import { Post } from "../../../../types";
import { getPostById } from "../../services/postService";
import NewAnswer from "../NewAnswer";
import ".././ViewPost.css";


/**
 * Represents the profile page component. Routes to the right view based on the
 * logged in user and profile user relationship.
 * @returns the ProfilePage component.
 */
const ViewPostPage = () => {
  const { pid } = useParams();

  // post being rendered
  const [post, setPost] = useState<Post | null>(null);

  // keep track of if answers are being created
  const [creatingStudentAnswer, setCreatingStudentAnswer] = useState(false);
  const [creatingInstructorAnswer, setCreatingInstructorAnswer] =
    useState(false);

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
      <PostBox post={post} />
      {/* TODO - add logic for only creating a student response if the user is a student */}
      {/* only posts of type question should have the student and instructor response components */}
      {/* {post.type === 0 &&
        (post.studentAnswer !== null ? (
          <Answer answerId={post.studentAnswer} type={"student"} />
        ) : 
          <NewAnswer
            initialAnswer=""
            onSave={(newAnswer) => {
              // TODO: send newAnswer to the backend and update post state
              setPost((prevPost) =>
                prevPost ? { ...prevPost, studentAnswer: newAnswer } : null
              );
            }}
            onCancel={() => {
              console.log('cancel clickeddd')
            }}
            type={"student"}
            editing={false}
          />
        ) } */}
      {post.type === 0 &&
        (post.studentAnswer !== null ? (
          <Answer answerId={post.studentAnswer} type={"student"} />
        ) : creatingStudentAnswer ? (
          <NewAnswer
            initialAnswer=""
            onSave={(newAnswer) => {
              setPost((prevPost) =>
                prevPost ? { ...prevPost, studentAnswer: newAnswer } : null
              );
              setCreatingStudentAnswer(false); // hide after submit
            }}
            onCancel={() => {
              setCreatingStudentAnswer(false); // hide on cancel
            }}
            type={"student"}
          />
        ) : (
          <article data-id="s_answer" className="answer" aria-label="Student Answer">
            <header className="border-bottom container-fluid">
              <div className="row">
                <div className="text-left pl-0 col">
                  <h2>the student's answer, </h2>
                  <span className="post_type_snippet">where students collectively construct a single answer</span>
                </div>
              </div>
            </header>
            <div className="content container-fluid">
              <div className="g-0 row">
                <div className="col">

                  <input
                    placeholder="Click to start off the wiki answer"
                    id="s_answerPlaceholderId"
                    className="my-3 form-control"
                    value=""
                    onFocus={() => setCreatingStudentAnswer(true)} // editor appears when input box is clicked
                    readOnly
                  />
                </div>
              </div>
            </div>

          </article>
        ))}

      {/* TODO - add logic for only creating an instructor response if the user is an instructor */}
      {/* {post.type === 0 &&
        (post.instructorAnswer !== null ? (
          <Answer answerId={post.instructorAnswer} type={"instructor"} />
        ) : 
          <NewAnswer
            initialAnswer=""
            onSave={(newAnswer) => {
              // TODO: send newAnswer to the backend and update post state
              setPost((prevPost) =>
                prevPost ? { ...prevPost, instructorAnswer: newAnswer } : null
              );
            }}
            onCancel={() => {
            }}
            type="instructor"
            editing={false}
          />
        ) } */}
      {post.type === 0 &&
        (post.instructorAnswer !== null ? (
          <Answer answerId={post.instructorAnswer} type={"instructor"} />
        ) : creatingInstructorAnswer ? (
          <NewAnswer
            initialAnswer=""
            onSave={(newAnswer) => {
              setPost((prevPost) =>
                prevPost ? { ...prevPost, instructorAnswer: newAnswer } : null
              );
              setCreatingInstructorAnswer(false);
            }}
            onCancel={() => {
              setCreatingInstructorAnswer(false);
            }}
            type="instructor"
          />
        ) : (
          <article data-id="i_answer" className="answer" aria-label="Instructor Answer">
            <header className="border-bottom container-fluid">
              <div className="row">
                <div className="text-left pl-0 col">
                  <h2>the instructor's answer, </h2>
                  <span className="post_type_snippet">where instructors collectively construct a single answer</span>
                </div>
              </div>
            </header>
            <div className="content container-fluid">
              <div className="g-0 row">
                <div className="col">

                  <input
                    placeholder="Click to start off the wiki answer"
                    id="i_answerPlaceholderId"
                    className="my-3 form-control"
                    value=""
                    onFocus={() => setCreatingInstructorAnswer(true)} // editor appears when input box is clicked
                    readOnly
                  />
                </div>
              </div>
            </div>

          </article>
        ))}

      <FollowupDiscussions
        convoExists={post.followupDiscussions.length !== 0}
        fudIds={post.followupDiscussions}
        setPost={setPost}
        postId={post._id!!}
      />{" "}
      {/* TODO - idk about this null check */}
    </div>
  );
};
export default ViewPostPage;
