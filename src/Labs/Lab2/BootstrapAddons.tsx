import { FormControl, InputGroup } from "react-bootstrap";

export default function BootstrapAddons() {
  return (
    <div id="wd-css-styling-addons">
      <h3>Addons</h3>
      <InputGroup className="mb-3">
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text>0.00</InputGroup.Text>
        <FormControl />
      </InputGroup>
      <InputGroup>
        <FormControl />
        <InputGroup.Text>$</InputGroup.Text>
        <InputGroup.Text>0.00</InputGroup.Text>
      </InputGroup>
    </div>
  );
}