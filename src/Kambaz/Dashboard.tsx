/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { Row, Col, Card, Button, Form, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState } from "react";
import * as enrollmentClient from "./Courses/Enrollments/client.ts";
import * as userClient from "./Account/client.ts";

type Props = {
  course: any;
}

export default function Dashboard(
  { allCourses, courses, newCourse, setNewCourse, addCourse, deleteCourse, updateCourse }: {
    allCourses: any[]; courses: any[]; newCourse: any; setNewCourse: (course: any) => void; addCourse: (course: any) => void; deleteCourse: (course: any) => void; updateCourse: (course: any) => any;
  }) {

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser.role === "FACULTY";
  const [viewEnrollments, setViewEnrollments] = useState<boolean>(false);
  const [myCourses, setMyCourses] = useState<any[]>(courses);

  const updateEnrollments = async () => {
    setMyCourses(await userClient.findMyCourses());
  }

  const DashboardCourse = ({ course }: Props) => {
    return (
      <Col className="wd-dashboard-course" style={{ width: "300px" }}>
        <Card>
          <Link to={`/Kambaz/Courses/${course._id}/Home`}
            className="wd-dashboard-course-link text-decoration-none text-dark">
            <Card.Img src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
            <Card.Body className="card-body">
              <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                {course.name} </Card.Title>
              <Card.Text className="wd-dashboard-course-description overflow-hidden"
                style={{ height: "100px" }}>
                {course.description}
              </Card.Text>
              <Button variant="primary">
                Go
              </Button>
              {isFaculty &&
                <Button onClick={(event) => {
                  event.preventDefault();
                  deleteCourse(course._id);
                }} className="btn btn-danger float-end"
                  id="wd-delete-course-click">
                  Delete
                </Button>
              }
              {isFaculty &&
                <Button id="wd-edit-course-click"
                  onClick={(event) => {
                    event.preventDefault();
                    setNewCourse(course);
                  }}
                  className="btn btn-warning me-2 float-end">
                  Edit
                </Button>
              }
            </Card.Body>
          </Link>
        </Card>
      </Col>);
  }

  const EnrollmentCourse = ({ course }: Props) => {
    const [enrolled, setEnrolled] = useState<boolean>(myCourses.some((c) => c._id === course._id));
    return (
      <Col className="wd-dashboard-course" style={{ width: "300px" }}>
        <Card>
          <Card.Img src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
          <Card.Body className="card-body">
            <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
              {course.name} </Card.Title>
            <Card.Text className="wd-dashboard-course-description overflow-hidden"
              style={{ height: "100px" }}>
              {course.description}
            </Card.Text>
            <div>
              {enrolled &&
                <Button className="mb-4 float-end" variant="danger" onClick={async () => {
                  enrollmentClient.unenroll(course._id);
                  setEnrolled(false);
                }}>Unenroll</Button>
              }
              {!enrolled &&
                <Button className="mb-4 float-end" variant="success" onClick={async () => {
                  enrollmentClient.enroll(course._id);
                  setEnrolled(true);
                }}>Enroll</Button>
              }
            </div>
          </Card.Body>
        </Card>
      </Col>
    );
  }

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <Button variant="primary" onClick={() => {
        setViewEnrollments(!viewEnrollments); updateEnrollments();
      }}>Enrollments</Button>
      {!viewEnrollments &&
        <div>
          {isFaculty &&
            <div>
              <h5>New Course
                <button
                  className="btn btn-primary float-end"
                  id="wd-add-new-course-click"
                  onClick={() => addCourse(newCourse)}>
                  Add
                </button>
                <button className="btn btn-warning float-end me-2"
                  onClick={() => updateCourse(newCourse)} id="wd-update-course-click">
                  Update
                </button>
              </h5><br />
              <FormControl value={newCourse.name} className="mb-2"
                onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })} />
              <Form.Control as="textarea" value={newCourse.description} rows={3}
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })} />
            </div>
          }
          <h2 id="wd-dashboard-published">Published Courses ({myCourses.length})</h2> <hr />
          <div id="wd-dashboard-courses">
            <Row xs={1} md={5} className="g-4">
              {myCourses.map((course, index) =>
                <DashboardCourse course={course} key={index} />)}
            </Row>
          </div>
        </div>
      }
      {viewEnrollments &&
        <Row xs={1} md={5} className="g-4">
          {allCourses.map((c, index) =>
            <EnrollmentCourse course={c} key={index} />)}
        </Row>
      }
    </div>
  );
}

