import { FormSelect } from "react-bootstrap";

export default function BootstrapForms() {
  return (
    <div id="wd-css-styling-dropdowns">
      <h3>Dropdowns</h3>
      <FormSelect defaultValue={"1"}>
        <option>Open this select menu</option>
        <option id="one" value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </FormSelect>
    </div>
  );
}