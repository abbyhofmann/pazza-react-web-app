import { Button, Form, FormSelect } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <div className="my-4">
        <Form.Control id="wd-username"
          placeholder="username"
          defaultValue="alice"
          className="mb-2" />
        <Form.Control id="wd-password"
          placeholder="password"
          defaultValue="123"
          // type="password"
          className="mb-2" />
        <Form.Control id="wd-firstname"
          placeholder="First Name"
          defaultValue="Alice"
          className="mb-2" />
        <Form.Control id="wd-lastname"
          placeholder="Last Name"
          defaultValue="Wonderland"
          className="mb-2" />
        <Form.Control className="mb-2" id="wd-dob" type="date" value="2000-01-01" />
        <Form.Control id="wd-email"
          placeholder="Email"
          defaultValue="alice@wonderland"
          type="email"
          className="mb-2" />
        <FormSelect>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option selected value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </FormSelect>
      </div>
      <Button variant="danger" href="/Kambaz/Account/Signin">Sign Out</Button>
    </div>
  );
}
