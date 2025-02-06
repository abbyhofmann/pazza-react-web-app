import { Button, Col, Form, Row } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <Form>
        {/* TODO:  */}
        <Form.Group as={Row} className="mb-3">
          <Col sm={10}><Form.Label htmlFor="wd-name" column> Assignment Name </Form.Label></Col>
          <Col sm={10}>
            <Form.Control id="wd-name" type="text" value="A1 - ENV + HTML" />
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
            <Form.Control id="wd-group" as="select">
              <option value="ASSIGNMENTS">Assignments</option>
              <option value="QUIZZES">Quizzes</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="my-4">
          <Col><Form.Label htmlFor="wd-display-grade-as" column>Display Grade as</Form.Label></Col>
          <Col sm={5}>
            <Form.Control id="wd-display-grade-as" as="select">
              <option value="PERCENTAGE">Percentage</option>
              <option value="ABSOLUTE">Absolute</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="my-4">
          <Col><Form.Label htmlFor="wd-submission-type" column>Submission Type</Form.Label></Col>
          <Col sm={5}>
            <Form.Control id="wd-submission-type" as="select">
              <option selected value="ONLINE">Online</option>
              <option value="PAPER">Paper</option>
            </Form.Control>
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
          {/* TODO: spacing */}
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
            <Form.Label htmlFor="wd-available-from" row><b>Available From</b></Form.Label>
            <Form.Control id="wd-available-from" type="date" value="2024-05-06" />
            <Form.Label htmlFor="wd-available-until" row><b>Until</b></Form.Label>
            <Form.Control id="wd-available-until" type="date" value="2024-05-20" />
          </Col>
        </Form.Group>
      </Form>
      <hr />
      <Button variant="danger" size="lg" className="me-1 float-end" id="wd-save-assignment-btn">
        Save
      </Button>
      <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-cancel-assignment-btn">
        Cancel
      </Button>
    </div>
  );
}
