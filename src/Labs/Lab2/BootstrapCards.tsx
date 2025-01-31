import { Button, Card } from "react-bootstrap";

export default function BootstrapCards() {
  return (
    <div id="wd-css-navigating-with-cards">
      <h2>
        Cards
      </h2>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="images/stacked.jpg" />
        <Card.Body>
          <Card.Title>Stacking Starship</Card.Title>
          <Card.Text>
            Stacking the most powerful rocket in history. Mars or bust!
          </Card.Text>
          <Button variant="primary">Boldly Go</Button>
        </Card.Body>
      </Card>
    </div>
  );
}