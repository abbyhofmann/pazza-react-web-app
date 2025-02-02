import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

type Props = {
  code: string;
  title: string;
  image?: string;
  color?: string;
  page: string;
}

export default function Course({ code, title, image, color, page }: Props) {
  return (
    <Col className="wd-dashboard-course" style={{ width: "270px" }}>
      <Card>
        <Link to={page}
          className="wd-dashboard-course-link text-decoration-none text-dark">
          {image ?
            (<Card.Img variant="top" src={image} width="100%" height={160} />) :
            (<div
              style={{
                backgroundColor: color ?? "#443fef",
                height: "160px",
                width: "100%",
              }}
            ></div>
            )}
          <Card.Body>
            <Card.Title className="wd-dashboard-course-title">{code}</Card.Title>
            <Card.Text className="wd-dashboard-course-description">{title}</Card.Text>
          </Card.Body>
        </Link>
      </Card>
    </Col>
  );
}