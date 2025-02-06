import { Button, ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { FaPencilAlt, FaPlus } from "react-icons/fa";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { IoEllipsisVertical } from "react-icons/io5";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      {/* TODO: magnifying glass icon + sizing */}
      <div>
        <div className="m-4">
          <input placeholder="Search..."
            id="wd-search-assignment" />
          <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-assignment">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Assignment
          </Button>
          <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-add-assignment-group">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Group
          </Button>
        </div>
      </div>
      <div className="p-4">
        <ListGroup className="rounded-0" id="wd-assignments">
          <ListGroup.Item className="wd-assignment p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              {/* TODO: 40% chip */}
              <BsGripVertical className="me-2 fs-3" />
              Assignments 40% of total
              <IoEllipsisVertical className="float-end fs-4" />
              <FaPlus className="float-end" />
            </div>
            <ListGroup className="wd-lessons rounded-0">
              <ListGroup.Item className="wd-lesson p-3 ps-1">
                <LessonControlButtons />
                <div style={{ width: "75%" }}>
                  <BsGripVertical className="me-2 fs-3" />
                  <FaPencilAlt className="text-success fs-4 me-4" />
                  A1
                  <p className="ms-4 mt-2">
                    <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 6 at 12:00am | <b>Due</b> May 13 at 11:59pm | 100 pts
                  </p>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="wd-lesson p-3 ps-1">
                <LessonControlButtons />
                <div style={{ width: "75%" }}>
                  <BsGripVertical className="me-2 fs-3" />
                  <FaPencilAlt className="text-success fs-4 me-4" />
                  A2
                  <p className="ms-4 mt-2">
                    <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 13 at 12:00am | <b>Due</b> May 20 at 11:59pm | 100 pts
                  </p>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className="wd-lesson p-3 ps-1">
                <LessonControlButtons />
                <div style={{ width: "75%" }}>
                  <BsGripVertical className="me-2 fs-3" />
                  <FaPencilAlt className="text-success fs-4 me-4" />
                  A3
                  <p className="ms-4 mt-2">
                    <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> May 20 at 12:00am | <b>Due</b> May 27 at 11:59pm | 100 pts
                  </p>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </ListGroup.Item>
        </ListGroup>
      </div>
      {/* <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3><ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <a href="#/Kambaz/Courses/1234/Assignments/1"
            className="wd-assignment-link">
            A1 - ENV + HTML
          </a>
          <br />
          Multiple Modules | <b>Not available until May 6 at 12:00am</b> | Due May 13 at 11:59pm | 100 pts
        </li>
        <li className="wd-assignment-list-item">
          <a href="#/Kambaz/Courses/1234/Assignments/2"
            className="wd-assignment-link">
            A2 - CSS + BOOTSTRAP
          </a>
          <br />
          Multiple Modules | <b>Not available until May 13 at 12:00am</b> | Due May 20 at 11:59pm | 100 pts
        </li>
        <li className="wd-assignment-list-item">
          <a href="#/Kambaz/Courses/1234/Assignments/3"
            className="wd-assignment-link">
            A3 - JAVASCRIPT + REACT
          </a>
          <br />
          Multiple Modules | <b>Not available until May 20 at 12:00am</b> | Due May 27 at 11:59pm | 100 pts
        </li>
      </ul> */}
    </div>
  );
}
