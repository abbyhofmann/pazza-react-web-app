import "./FollowupDiscussions.css";
import ResolvedButtons from "./ResolvedButtons/ResolvedButtons";
import "./FollowupDiscussions.css";

interface FollowupDiscussionsProps {
  convoExists: boolean;
}

// Component for displaying followup discussions of a post.
export default function FollowupDiscussions(props: FollowupDiscussionsProps) {
  const { convoExists } = props;

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
        <div className="followup_content_wrapper col">
          <ResolvedButtons />
          <div className="g-1 row">
            <div className="mx-0 col-auto">
              <div className="avatar" aria-hidden="true"></div>
            </div>
            <div className="col">
              <span data-id="contributors">
                <b>Anonymous Beaker</b>
              </span>
              &nbsp;
              <span className="helper-text">
                <time
                  dateTime="2025-02-27T05:06:15.000Z"
                  title="Thu Feb 27 2025 00:06:15 GMT-0500 (Eastern Standard Time)"
                >
                  2 weeks ago
                </time>
              </span>
              <div
                id="m7mvt9ipcj61pk_render"
                data-id="renderHtmlId"
                className="render-html-content overflow-hidden latex_process"
              >
                Is this for rule 45 for 100% for all sections?
              </div>
              <div
                data-id="followup_reply_idx1_0"
                id="m7mvuzhntd4fj"
                className="followup_reply gx-1 gy-0 row"
              >
                <div className="mx-0 col-auto">
                  <div className="avatar" aria-hidden="true"></div>
                </div>
                <div className="col">
                  <b>
                    <span className="instructor-label-icon"></span>
                    <span data-id="contributors">Sakib Miazi</span>
                  </b>
                  <span className="helper-text">
                    <time
                      dateTime="2025-02-27T05:07:36.000Z"
                      title="Thu Feb 27 2025 00:07:36 GMT-0500 (Eastern Standard Time)"
                    >
                      2 weeks ago
                    </time>
                  </span>
                  <div
                    id="m7mvuzhntd4fj_render"
                    data-id="renderHtmlId"
                    className="render-html-content overflow-hidden latex_process"
                  >
                    My mistake, it's for the online section for now. We might
                    adjust later.
                  </div>
                </div>
              </div>
              <div className="gx-1 followup comment pr-0 pl-0 pb-0 row">
                <div className="pr-0 mr-0 pl-0 pb-0 col">
                  <input
                    data-id="followup_reply_idx1"
                    type="text"
                    className="form-control ng-pristine ng-valid my-0"
                    placeholder="Reply to this followup discussion"
                    aria-label="Click to reply to this followup discussion"
                  />
                </div>
              </div>
            </div>
          </div>
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
