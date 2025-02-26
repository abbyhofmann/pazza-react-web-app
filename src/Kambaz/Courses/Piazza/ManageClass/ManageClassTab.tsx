import { Link, useLocation, useParams } from "react-router-dom";

export default function ManageClassTab() {
  const tabs = ["General Settings", "Customize Q&A", "Manage Folders", "Manage Enrollment", "Create Groups", "Customize Course Page", "Piazza Network Settings"];
  const links = tabs.map(tab => tab.split(" ").join("-"));
  const { cid } = useParams();
  const path = `/Kambaz/Courses/${cid}/Piazza/Manage-Class/`;

  const { pathname } = useLocation();

  return (
    <div id="nav_tab" className="d-flex flex-row justify-content-around text-wrap">
      {tabs.map((tab, index) => {
        const link = path + links[index];
        return (
          <div key={index} className="col-sm me-1 float-end">
            <Link
              key={index}
              to={link}
              id={`wd-course-${links[index]}-link`}
              className={`list-group-item ${pathname.includes(link) ? "selected" : ""} border border-0`}
            >
              {tab}
            </Link>
          </div>
        )
      })}
    </div >
  )
}