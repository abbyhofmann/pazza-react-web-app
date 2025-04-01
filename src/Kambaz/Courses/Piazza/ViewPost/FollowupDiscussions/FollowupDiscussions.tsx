import "./FollowupDiscussions.css";
import FollowupDiscussion from "./FollowupDiscussion";
import { useState } from "react";
import ReactQuill from "react-quill";
import { createDiscussion } from "../../services/followupDiscussionService";

interface FollowupDiscussionsProps {
  convoExists: boolean;
  fudIds: string[];
}

// Component for displaying followup discussions of a post.
export default function FollowupDiscussions(props: FollowupDiscussionsProps) {
  const { convoExists, fudIds } = props;

  const [startingNewDiscussion, setStartingNewDiscussion] = useState<boolean>(false);

  const handleOnSave = async (newDiscussion: string) => {
    try {
        // create the followup discussion in the db
        const newDiscussionFromDb = await createDiscussion(answer._id, updatedContent);
        // TODO - update the fudIds to have the new discussion 

    } catch (error) {
        console.error("Error creating followup discussion:", error);
    }
    setStartingNewDiscussion(false);
}

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
        <div className="followup_content_wrapper col mx-3">
          {fudIds.map((fudId) => (<FollowupDiscussion fudId={fudId} />))}
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
                            // rich text editor ----> TODO - why does the change add paragraph tags???
                            <ReactQuill
                                theme="snow"
                                className="custom-editor"
                                value={'hi'}
                                // onChange={setAnswerContent}
                            />
                        )}
            {/* <input
              id="followup-box"
              type="text"
              className="form-control ng-pristine ng-valid"
              placeholder="Compose a new followup discussion"
            /> */}
          </div>
        </div>
      </div>
      {startingNewDiscussion &&
                <footer className="border-top container-fluid">
                    <div className="row">
                        <div className="text-left align-self-center m-1 col-auto">
                            <button className="btn btn-primary btn-sm me-2" onClick={() => onSave(answerContent)}>Submit</button>
                            <button className="btn btn-secondary btn-sm" onClick={onCancel}>Cancel</button>
                        </div>
                    </div>
                </footer>
            }
    </article>
  );
}
