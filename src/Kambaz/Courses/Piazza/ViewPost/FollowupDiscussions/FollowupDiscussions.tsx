import "./FollowupDiscussions.css";
import FollowupDiscussion from "./FollowupDiscussion";

interface FollowupDiscussionsProps {
    convoExists: boolean;
    fudIds: string[];
  }

// Component for displaying followup discussions of a post.
export default function FollowupDiscussions(props: FollowupDiscussionsProps) {
  const { convoExists, fudIds } = props;

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
      {/* existing convo goes here  */}
      {convoExists && (
        // will likely need a for-loop to loop through all of a post's followup discussions
        <div className="followup_content_wrapper col mx-3">
          {fudIds.map((fudId) => (<FollowupDiscussion fudId={fudId}/>))}
        </div>
      )}

      {/* input box to start a new followup dicussion */}
      <div className="content container-fluid">
        <div className="row">
          <div className="pt-2 pb-3 col">
            <label htmlFor="followup-box">
              Start a new followup discussion
            </label>
            <input
              id="followup-box"
              type="text"
              className="form-control ng-pristine ng-valid"
              placeholder="Compose a new followup discussion"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
