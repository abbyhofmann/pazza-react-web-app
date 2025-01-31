import { Button, Col, Form, Row } from "react-bootstrap";

export default function BootstrapResponsiveForms() {
  return (
    <div id="wd-css-responsive-forms-2">
      <h3>Responsive forms</h3>
      <Form>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}> Email </Form.Label>
          <Col sm={10}>
            <Form.Control type="email" placeholder="Email" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}> Password </Form.Label>
          <Col sm={10}>
            <Form.Control type="password" placeholder="Password" />
          </Col>
        </Form.Group>
        <fieldset>
          <Form.Group as={Row} className="mb-3">
            <Form.Label as="legend" column sm={2}>
              Radios </Form.Label>
            <Col sm={10}>
              <Form.Check type="radio" label="first radio"
                checked name="formHorizontalRadios" />
              <Form.Check type="radio" label="second radio"
                name="formHorizontalRadios" />
              <Form.Check type="radio" label="third radio"
                name="formHorizontalRadios" />
            </Col>
          </Form.Group>
        </fieldset>
        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Form.Check label="Remember me" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col>
            <Button type="submit">Sign in</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}
