import { useState } from "react";
import { Form, FormControl } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });
  const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary me-2"
        href={`${REMOTE_SERVER}/lab5/assignment`}>
        Get Assignment
      </a><hr />
      <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-assignments-title" className="btn btn-primary"
        href={`${REMOTE_SERVER}/lab5/assignment/title`}>
        Get Assignment Title
      </a><hr />
      <h4>Modifying Properties</h4>
      <div className="mb-3">
        <a id="wd-update-assignment-title"
          className="btn btn-primary float-end"
          href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
          Update Title
        </a>
        <FormControl className="w-75" id="wd-assignment-title"
          defaultValue={assignment.title} onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })} />
      </div>
      <div className="mb-3">
        <a id="wd-update-assignment-score"
          className="btn btn-primary float-end"
          href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
          Update Score
        </a>
        <Form.Group className="w-75" controlId="formBasicNumber">
          <Form.Control type="number" placeholder="Enter New Score" onChange={(e) => {
            const score = parseInt(e.target.value);
            console.log(score);
            setAssignment({ ...assignment, score: score })
          }} />
        </Form.Group>
      </div>
      <div>
        <a id="wd-update-assignment-completed"
          className="btn btn-primary float-end"
          href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}>
          Update Completed
        </a>
        Check for Complete and Uncheck for Incomplete
        <input type="checkbox"
          className="ms-4"
          onChange={(e) => setAssignment({ ...assignment, completed: e.target.checked })} />
      </div>
      <hr />
      <h4>New Endpoint with Modules</h4>
      <a id="wd-retrieve-module" className="btn btn-primary"
        href={`${REMOTE_SERVER}/lab5/module`}>
        Get Module
      </a><hr />
      <a id="wd-retrieve-module-name" className="btn btn-primary"
        href={`${REMOTE_SERVER}/lab5/module/name`}>
        Get Module Name
      </a><hr />
    </div>
  );
}
