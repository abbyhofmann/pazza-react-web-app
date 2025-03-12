import "./styles.css";
import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import * as db from "./Database";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import ProtectedRoute from "./Account/ProtectedRoute";

export default function Kambaz() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [courses, setCourses] = useState<any[]>(db.courses);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [course, setCourse] = useState<any>({
    _is: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description"
  });
  const addNewCourse = () => {
    const newCourse = { ...course, _id: uuidv4() };
    setCourses([...courses, newCourse]);
  };
  const updateCourse = () => {
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };
  const deleteCourse = (courseId: string) => {
    setCourses(courses.filter((course: { _id: string; }) => course._id !== courseId));
  };
  return (
    <div id="wd-kambaz">
      <KambazNavigation />
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<Navigate to="Account" />} />
          <Route path="/Account/*" element={<Account />} />
          <Route path="/Dashboard" element={
            <ProtectedRoute>
              <Dashboard
                courses={courses}
                course={course}
                setCourse={setCourse}
                addNewCourse={addNewCourse}
                deleteCourse={deleteCourse}
                updateCourse={updateCourse}
              />
            </ProtectedRoute>
          } />
          <Route path="/Courses/:cid/*" element={
            <ProtectedRoute><Courses courses={courses} /></ProtectedRoute>
          } />
          <Route path="/Calendar" element={<h1>Calendar</h1>} />
          <Route path="/Inbox" element={<h1>Inbox</h1>} />
        </Routes>
      </div>
    </div>
  );
}
