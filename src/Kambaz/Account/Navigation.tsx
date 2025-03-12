import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0 me-4">
      {links.map((link, index) =>
        <Link
          key={index}
          to={`/Kambaz/Account/${link}`}
          className="list-group-item active mb-2 border border-0">
          {link}
        </Link>)
      }
    </div>
  );
}
