/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Form, FormSelect, Row } from "react-bootstrap";
import { assignments } from "../../Database";
import { useSelector } from "react-redux";
import * as assignmentClient from "./client";
import { Link, useParams } from "react-router";

export default function AssignmentEditor() {
  const { aid, cid } = useParams();
  const assignment = assignments.find(v => v._id === aid);
  const backLink = `/Kambaz/Courses/${cid}#/Kambaz/Courses/${cid}/Assignments`;
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role === "FACULTY";
  const assignmentEdited = assignment ?? {};

  const editAssignment = async (amt: any) => {
    await assignmentClient.updateAssignment(amt);
  }

  if (assignment) {
    return (
      <div id="wd-assignments-editor">
        {isFaculty &&
          <div>
            <Form>
              <Form.Group as={Row} className="mb-3">
                <Col sm={10}><Form.Label htmlFor="wd-name" column> Assignment Name </Form.Label></Col>
                <Col sm={10}>
                  <Form.Control id="wd-name" type="text" defaultValue={assignment.title}
                    onChange={(e) => editAssignment({ ...assignmentEdited, title: e.target.value })} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="my-4">
                <Col sm={10}>
                  <Form.Control
                    id="wd-description"
                    as="textarea"
                    rows={5}
                    value="The assignment is available online. Submit a link to the landing page."
                    onChange={(e) => editAssignment({ ...assignmentEdited, description: e.target.value })} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="my-4">
                <Col><Form.Label htmlFor="wd-points" column>Points</Form.Label></Col>
                <Col sm={5}>
                  <Form.Control id="wd-points" as="input" value="100"
                    onChange={(e) => editAssignment({ ...assignmentEdited, points: e.target.value })} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="my-4">
                <Col><Form.Label htmlFor="wd-group" column>Assignment Group</Form.Label></Col>
                <Col sm={5}>
                  <FormSelect id="wd-group">
                    <option value="ASSIGNMENTS">Assignments</option>
                    <option value="QUIZZES">Quizzes</option>
                  </FormSelect>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="my-4">
                <Col><Form.Label htmlFor="wd-display-grade-as" column>Display Grade as</Form.Label></Col>
                <Col sm={5}>
                  <FormSelect id="wd-display-grade-as">
                    <option value="PERCENTAGE">Percentage</option>
                    <option value="ABSOLUTE">Absolute</option>
                  </FormSelect>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="my-4">
                <Col><Form.Label htmlFor="wd-submission-type" column>Submission Type</Form.Label></Col>
                <Col sm={5}>
                  <FormSelect id="wd-submission-type">
                    <option value="ONLINE">Online</option>
                    <option value="PAPER">Paper</option>
                  </FormSelect>
                  <Col><Form.Label column><b>Online Entry Options</b></Form.Label></Col>
                  <Col>
                    <Form.Check id="wd-text-entry" type="checkbox" label="Text Entry" />
                    <Form.Check id="wd-website-url" type="checkbox" label="Website URL" />
                    <Form.Check id="wd-media-recordings" type="checkbox" label="Media Recordings" />
                    <Form.Check id="wd-student-annotations" type="checkbox" label="Student Annotations" />
                    <Form.Check id="wd-file-uploads" type="checkbox" label="File Uploads" />
                  </Col>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="my-4">
                <Form.Label>Assign</Form.Label>
                <Col>
                  <Form.Label htmlFor="wd-assign-to" column><b>Assign To</b></Form.Label>
                  <Form.Control id="wd-assign-to" as="input" value="EVERYONE" />
                </Col>
                <Col>
                  <Form.Label htmlFor="wd-due-date" column><b>Due Date</b></Form.Label>
                  <Form.Control id="wd-due-date" type="date" defaultValue="2024-05-13" />
                </Col>
                <Col>
                  <Form.Label htmlFor="wd-available-from">
                    <b>Available From</b>
                  </Form.Label>
                  <Form.Control id="wd-available-from" type="date" defaultValue="2024-05-06"
                    onChange={(e) => editAssignment({ ...assignmentEdited, from: e.target.value })} />
                  <Form.Label htmlFor="wd-available-until"><b>Until</b></Form.Label>
                  <Form.Control id="wd-available-until" type="date" defaultValue="2024-05-20"
                    onChange={(e) => editAssignment({ ...assignmentEdited, until: e.target.value })} />
                </Col>
              </Form.Group>
              <hr />
              <Button variant="danger" size="lg" className="me-1 float-end" id="wd-save-assignment-btn" href={backLink} type="submit"
                onClick={() => editAssignment(assignmentEdited)}>
                Save
              </Button>
              <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-cancel-assignment-btn" href={backLink}>
                Cancel
              </Button>
            </Form>
          </div>
        }
        {!isFaculty && <>Only Access for Faculty</>}
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Col sm={10}><Form.Label htmlFor="wd-name" column> Assignment Name </Form.Label></Col>
            <Col sm={10}>
              <Form.Control id="wd-name" type="text" value={assignment.title} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-4">
            <Col sm={10}>
              <Form.Control
                id="wd-description"
                as="textarea"
                rows={5}
                value="The assignment is available online. Submit a link to the landing page." />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-4">
            <Col><Form.Label htmlFor="wd-points" column>Points</Form.Label></Col>
            <Col sm={5}>
              <Form.Control id="wd-points" as="input" value="100" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-4">
            <Col><Form.Label htmlFor="wd-group" column>Assignment Group</Form.Label></Col>
            <Col sm={5}>
              <FormSelect id="wd-group">
                <option value="ASSIGNMENTS">Assignments</option>
                <option value="QUIZZES">Quizzes</option>
              </FormSelect>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-4">
            <Col><Form.Label htmlFor="wd-display-grade-as" column>Display Grade as</Form.Label></Col>
            <Col sm={5}>
              <FormSelect id="wd-display-grade-as">
                <option value="PERCENTAGE">Percentage</option>
                <option value="ABSOLUTE">Absolute</option>
              </FormSelect>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-4">
            <Col><Form.Label htmlFor="wd-submission-type" column>Submission Type</Form.Label></Col>
            <Col sm={5}>
              <FormSelect id="wd-submission-type">
                <option value="ONLINE">Online</option>
                <option value="PAPER">Paper</option>
              </FormSelect>
              <Col><Form.Label column><b>Online Entry Options</b></Form.Label></Col>
              <Col>
                <Form.Check id="wd-text-entry" type="checkbox" label="Text Entry" />
                <Form.Check id="wd-website-url" type="checkbox" label="Website URL" />
                <Form.Check id="wd-media-recordings" type="checkbox" label="Media Recordings" />
                <Form.Check id="wd-student-annotations" type="checkbox" label="Student Annotations" />
                <Form.Check id="wd-file-uploads" type="checkbox" label="File Uploads" />
              </Col>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="my-4">
            <Form.Label>Assign</Form.Label>
            <Col>
              <Form.Label htmlFor="wd-assign-to" column><b>Assign To</b></Form.Label>
              <Form.Control id="wd-assign-to" as="input" value="EVERYONE" />
            </Col>
            <Col>
              <Form.Label htmlFor="wd-due-date" column><b>Due Date</b></Form.Label>
              <Form.Control id="wd-due-date" type="date" value="2024-05-13" />
            </Col>
            <Col>
              <Form.Label htmlFor="wd-available-from"><b>Available From</b></Form.Label>
              <Form.Control id="wd-available-from" type="date" value="2024-05-06" />
              <Form.Label htmlFor="wd-available-until"><b>Until</b></Form.Label>
              <Form.Control id="wd-available-until" type="date" value="2024-05-20" />
            </Col>
          </Form.Group>
        </Form>
        <hr />
        <Button variant="danger" size="lg" className="me-1 float-end" id="wd-save-assignment-btn" href={backLink}>
          Save
        </Button>
        <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-cancel-assignment-btn">
          <Link
            to={"../Assignments/"}
            className="text">
            Cancel
          </Link>
        </Button>
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="text-danger">Couldn't Find Assignment</h1>
        <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-cancel-assignment-btn" href={backLink}>
          Go Back
        </Button>
      </div>
    )
  }
}
