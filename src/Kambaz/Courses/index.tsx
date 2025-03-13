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
import * as db from "../Database";
import { v4 as uuidv4 } from 'uuid';

export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  const [assignments, setAssignments] = useState<any[]>(db.assignments);
  const [assignment, setAssignment] = useState({
    _id: "0",
    title: "New Assignment",
    course: cid,
  });

  const addAssignment = () => {
    const newAssignment = { ...assignment, _id: uuidv4() };
    setAssignments([...assignments, newAssignment]);
    setAssignment({ _id: "0", title: "New Assignment", course: cid });
  };

  const editAssignment = (a: any) => {
    setAssignment(a);
  };

  const updateAssignment = () => {
    setAssignments(
      assignments.map((a) => {
        if (a._id === assignment._id) {
          return assignment;
        } else {
          return a;
        }
      })
    );
  };

  const deleteAssignment = (aId: string) => {
    setAssignments(assignments.filter(a => a._id !== aId));
  }

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
            <Route path="Assignments" element={<Assignments assignments={assignments} addAssignment={addAssignment} deleteAssignment={deleteAssignment} />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor updateAssignment={updateAssignment} editAssignment={editAssignment} />} />
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
