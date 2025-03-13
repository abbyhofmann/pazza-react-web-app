/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaAlignJustify } from "react-icons/fa";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Home from "./Home";
import Modules from "./Modules";
import CourseNavigation from "./Navigation";
import { Route, Routes, useLocation, useParams } from "react-router";
import PeopleTable from "./People/Table";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, deleteAssignment, updateAssignment } from "./Assignments/reducer";

export default function Courses() {
  const dispatch = useDispatch();
  const { cid } = useParams();
  const { courses } = useSelector((state: any) => state.courseReducer);
  const course = courses.find((course: any) => course._id === cid);
  const { pathname } = useLocation();
  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  const [assignment, setAssignment] = useState({
    _id: "0",
    title: "New Assignment",
    course: cid,
  });

  return (
    <div id="wd-courses">
      <h2 className="">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}</h2> <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments assignments={assignments} addAssignment={() => dispatch(addAssignment(assignment))} deleteAssignment={(aId) => dispatch(deleteAssignment(aId))} />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor updateAssignment={() => dispatch(updateAssignment(assignment))} editAssignment={setAssignment} />} />
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
