import { Link, useParams } from "react-router-dom";

export default function PiazzaNavBarTop() {

  const { cid } = useParams();
  const path = `/Kambaz/Courses/${cid}/Piazza`;

  return (
    <div className="wd-border-piazza-nav-bar">
      <div id="wd-piazza-nav" className="d-flex align-items-center justify-content-between width='100%' mb-3">

        <div className="d-flex align-items-start">
          <img src="images/Piazza_logo_(white).png" width="90px" height="20px"
            className="wd-logo-height" />
        </div>

        <div className="d-flex align-items-start wd-q-a wd-nav-height">
          Q & A
        </div>
        <div className="d-flex align-items-start wd-q-a wd-nav-height">
          Resources
        </div>
        <div className="d-flex align-items-start wd-q-a wd-nav-height">
          Statistics
        </div>
        <div className="d-flex align-items-start wd-q-a wd-nav-height">
          <Link
            to={path + "/manage-class"}
            id={`wd-course-piazza-link`}
          >
            Manage Class
          </Link>
        </div>

      </div>
    </div>
  )
}