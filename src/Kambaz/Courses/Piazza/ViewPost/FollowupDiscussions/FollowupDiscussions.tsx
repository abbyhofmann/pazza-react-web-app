import "./FollowupDiscussions.css";
import { Post } from "../../../../types";
import FollowupDiscussion from "./FollowupDiscussion";
import EditorComponent from "../EditorComponent";
import useFollowupDiscussions from "../../hooks/useFollowupDiscussions";

interface FollowupDiscussionsProps {
  convoExists: boolean;
  fudIds: string[];
  setPost: (post: Post) => void;
  postId: string;
}

// Component for displaying followup discussions of a post.
export default function FollowupDiscussions(props: FollowupDiscussionsProps) {

  const { convoExists, fudIds, setPost, postId } = props;

  const {
    startingNewDiscussion,
    setStartingNewDiscussion,
    discussionContent,
    setDiscussionContent,
    handleOnSave
  } = useFollowupDiscussions(setPost, postId);

  return (
    <article
      className="answer followup_container"
      aria-label="Followup Discussions"
    >
      <header className="container-fluid border-bottom">
        <div className="align-items-center row">
          <div className="text-left col">
            <span className="mr-2">followup discussions </span>
            <span className="post_type_snippet p-0 align-middle">
              for lingering questions and comments
            </span>
          </div>
        </div>
      </header>
      {/* existing convo goes here */}
      {convoExists && (
        <div className="followup_content_wrapper col mx-3">
          {fudIds.map((fudId) => (<FollowupDiscussion fudId={fudId} setPost={setPost} />))}
        </div>
      )}

      {/* input box to start a new followup dicussion */}
      <div className="content container-fluid">
        <div className="row">
          <div className="pt-2 pb-3 col">
            <label htmlFor="followup-box">
              Start a new followup discussion
            </label>
            {!startingNewDiscussion ? (
              // input box for adding a new answer
              <input
                id="followup-box"
                type="text"
                className="form-control ng-pristine ng-valid"
                placeholder="Compose a new followup discussion"
                onFocus={() => setStartingNewDiscussion(true)}
              />
            ) : (
              <EditorComponent content={discussionContent} setContent={setDiscussionContent} />
            )}
          </div>
        </div>
      </div>
      {startingNewDiscussion &&
        <footer className="border-top container-fluid">
          <div className="row">
            <div className="text-left align-self-center m-1 col-auto">
              <button className="btn btn-primary btn-sm me-2" onClick={() => handleOnSave(discussionContent)}>Submit</button>
              <button className="btn btn-secondary btn-sm" onClick={() => { setStartingNewDiscussion(false); setDiscussionContent(""); }}>Cancel</button>
            </div>
          </div>
        </footer>
      }
    </article>
  );
}
