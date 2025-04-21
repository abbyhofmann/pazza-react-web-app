/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as client from "./client";
import { FormControl, Button } from "react-bootstrap";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signin = async () => {
    const user = await client.signin(credentials);
    if (!user) return;
    dispatch(setCurrentUser(user));
    navigate("/Kambaz/Dashboard");
  };

  return (
    <div id="wd-signin-screen" className="d-flex w-100">
      <div className="w-100">
        <h1>Sign in</h1>
        <FormControl defaultValue={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          className="mb-2" placeholder="username" id="wd-username" />
        <FormControl defaultValue={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          className="mb-2" placeholder="password" type="password" id="wd-password" />
        <Button onClick={signin} id="wd-signin-btn" className="w-100"> Sign in </Button>
        <Link id="wd-signup-link" to="/Kambaz/Account/Signup"> Sign up </Link>
      </div>
      <div className="d-flex gap-3 ms-auto">
        <div className="flex-fill">Team Pazza - ASK</div>
        <div className="d-flex flex-column gap-3">
          <div className="flex-fill">Abby Hofmann</div>
          <div className="flex-fill">Sanjana Kashyap</div>
          <div className="flex-fill">Katie Winkleblack</div>
        </div>
        <Link className="flex-fill" to={"https://github.com/abbyhofmann/pazza-react-web-app"}>
          Github Repository
        </Link>
      </div>
    </div>
  );
}
