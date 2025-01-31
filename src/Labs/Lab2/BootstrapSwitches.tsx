import { Form } from "react-bootstrap";

export default function BootstrapSwitches() {
  return (
    <div id="wd-css-styling-switches">
      <h3>Switches</h3>
      <Form.Check type="switch" checked={false} id="wd-switch-1"
        label="Unchecked switch checkbox input" />
      <Form.Check type="switch" checked={true} id="wd-switch-2"
        label="Checked switch checkbox input" />
      <Form.Check type="switch" checked={false} disabled
        id="custom-switch"
        label="Unchecked disabled switch checkbox input" />
      <Form.Check type="switch" checked={true} disabled
        id="custom-switch"
        label="Checked disabled switch checkbox input" />
    </div>
  );
}