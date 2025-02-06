import { Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";

export default function KambazNavigation() {
  return (
    <div id="wd-kambaz-navigation" style={{ width: 115 }}
      className="list-group rounded-0 position-fixed
         bottom-0 top-0 d-none d-md-block bg-black z-2">
      <a id="wd-neu-link" target="_blank"
        href="https://www.northeastern.edu/"
        className="list-group-item border-0 text-center">
        <img src="/images/NEU.png" width="75px" />
      </a>
      <Link to="/Kambaz/Account" id="wd-account-link"
        className="list-group-item text-center border-0">
        <FaRegCircleUser className="fs-1" />
        Account
      </Link>
      <Link to="/Kambaz/Dashboard" id="wd-dashboard-link"
        className="list-group-item active text-center border-0">
        <AiOutlineDashboard className="fs-1" />
        Dashboard
      </Link>
      <Link to="/Kambaz/Dashboard" id="wd-course-link"
        className="list-group-item text-center border-0">
        <LiaBookSolid className="fs-1 text-danger" />
        Courses
      </Link>
      <Link to="/Kambaz/Dashboard" id="wd-calendar-link"
        className="list-group-item text-center border-0">
        <IoCalendarOutline className="fs-1 text-danger " />
        Calendar
      </Link>
      <Link to="/Kambaz/Dashboard" id="wd-inbox-link"
        className="list-group-item text-center mx-2 border-0">
        <FaInbox className="fs-1 text-danger " />
        Inbox
      </Link>
      <Link to="/Labs" id="wd-labs-link"
        className="list-group-item text-center mx-4 border-0">
        <LiaCogSolid className="fs-1 text-danger " />
        Labs
      </Link>
    </div>
  );
}
