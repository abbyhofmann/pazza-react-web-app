import { Row } from "react-bootstrap";
import Course from "./Course";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          <Course code="CS1234 React JS" title="Full Stack software developer" image="/images/reactjs.jpg" page="/Kambaz/Courses/1234/Home" />
          <Course code="CS 4550" title="Web Development" color="green" page="/Kambaz/Courses/1234/Home" />
          <Course code="CS 4550" title="Web Development" color="purple" page="/Kambaz/Courses/1234/Home" />
          <Course code="CS 4550" title="Web Development" image="/images/reactjs.jpg" page="/Kambaz/Courses/1234/Home" />
          <Course code="CS 4550" title="Web Development" color="maroon" page="/Kambaz/Courses/1234/Home" />
          <Course code="CS 4550" title="Web Development" image="/images/reactjs.jpg" page="/Kambaz/Courses/1234/Home" />
          <Course code="CS 4550" title="Web Development" page="/Kambaz/Courses/1234/Home" />
        </Row>
      </div>
    </div>
  );
}
