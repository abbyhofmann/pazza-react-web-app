import { Link, useLocation, useParams } from "react-router-dom";
export default function CourseNavigation() {
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  const { cid } = useParams();
  const { pathname } = useLocation();
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link, index) => {
        const path = `/Kambaz/Courses/${cid}/${link}`;
        return (
          <Link
            key={index}
            to={path}
            id={`wd-course-${link.toLowerCase()}-link`}
            className={`list-group-item border ${pathname.includes(path) ? "active" : ""} border-0`}
          >
            {link}
          </Link>
        )
      })}
    </div>
  );
}