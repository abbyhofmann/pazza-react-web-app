import { FormGroup, FormLabel } from "react-bootstrap";
import FormRange from "react-bootstrap/esm/FormRange";

export default function BootstrapSlider() {
  return (
    <div id="wd-css-styling-range-and-sliders">
      <h3>Range</h3>
      <FormGroup controlId="wd-range1">
        <FormLabel>Example range</FormLabel>
        <FormRange min="0" max="5" step="0.5" />
      </FormGroup>
    </div>
  );
}