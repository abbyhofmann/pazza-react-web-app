import { Link, useParams } from "react-router-dom";
import "./navbar.css";

export default function PiazzaNavBarTop() {

  const { cid } = useParams();
  const path = `/Kambaz/Courses/${cid}/Piazza`;

  return (
    <nav className="navbar navbar-expand-lg wd-border-piazza-nav-bar d-flex">
      <Link to={path}>
        <img src="/images/Piazzalogo.png" height="20px"
          className="wd-logo-height ps-4 w-1/4" />
      </Link>
      <div className="ps-4 ms-5 d-flex">
        <ul className="navbar-nav d-flex">
        <li className="nav-item  wd-font-bold">
            <a className="nav-link">{cid}</a>
          </li>
          
          <li className="nav-item">
            <Link
              className="nav-link"
              to={path}
              id={`wd-q-a-link`}
            >
              Q & A
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link">Resources</a>
          </li>
          <li className="nav-item">
            <a className="nav-link">Statistics</a>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to={path + "/manage-class"}
              id={`wd-manage-class-link`}
            >
              Manage Class
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}