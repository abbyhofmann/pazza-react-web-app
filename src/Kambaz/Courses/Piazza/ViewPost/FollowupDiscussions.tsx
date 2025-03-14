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
        <div className="followup_content_wrapper col">
          <div className="g-0 row">
            <div className="col-auto">
              <div className="resolved">
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    name="followup_resolution_m7mvt9ipcj61pk"
                    data-id="followup_resolution_resolved_idx1"
                    type="radio"
                    id="followup_resolution_resolved_m7mvt9ipcj61pk"
                    className="custom-control-input"
                  />
                  <label
                    title=""
                    htmlFor="followup_resolution_resolved_m7mvt9ipcj61pk"
                    className="custom-control-label"
                  >
                    Resolved
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    name="followup_resolution_m7mvt9ipcj61pk"
                    data-id="followup_resolution_unresolved_idx1"
                    type="radio"
                    id="followup_resolution_unresolved_m7mvt9ipcj61pk"
                    className="custom-control-input"
                  ></input>
                  <label
                    title=""
                    htmlFor="followup_resolution_unresolved_m7mvt9ipcj61pk"
                    className="custom-control-label"
                  >
                    Unresolved
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-1 pl-2 col">
              <button
                id="followupCopyId_idx1"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Copy @176_f1"
                aria-label="Copy Followup Id"
                type="button"
                className="post_number_copy_link btn btn-link-text"
              >
                <b>@176_f1</b>
              </button>
              <button
                id="followupCopyUrl_idx1"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Copy URL"
                aria-label="Copy Followup URL"
                type="button"
                className="url_copy_link btn btn-link-text"
              >
                <svg width="20px" height="20px">
                  <use href="#Link"></use>
                </svg>
              </button>
            </div>
            <div className="text-right col"></div>
          </div>
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
              <footer className="border-top container-fluid">
                <div className="row">
                  <div className="text-left align-self-center pb-1 pl-0 col-auto">
                    <button
                      data-id="endorse_idx1"
                      aria-label="mark this followup as helpful"
                      type="button"
                      className="text-notrans btn btn-link"
                    >
                      helpful!
                    </button>
                    <div
                      data-id="endorse_count_idx1"
                      className="d-inline-block good_post_number ml-1"
                      aria-label="0 endorsements"
                    >
                      &nbsp;0
                    </div>
                  </div>
                </div>
              </footer>
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
                  <footer className="border-top container-fluid">
                    <div className="row">
                      <div className="text-left align-self-center pb-1 pl-0 col-auto">
                        <button
                          data-id="endorse_idx0"
                          aria-label="mark this feedback as good comment"
                          type="button"
                          className="text-notrans btn btn-link"
                        >
                          good comment
                        </button>
                        <div
                          data-id="endorse_count_idx0"
                          className="d-inline-block good_post_number ml-1"
                          aria-label="0 endorsements"
                        >
                          &nbsp;0
                        </div>
                      </div>
                    </div>
                  </footer>
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
