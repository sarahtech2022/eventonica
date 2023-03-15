import Card from "react-bootstrap/Card";
import Moment from "react-moment";

const Event = (props) => {
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Date:{" "}
            {!props.time ? (
              "TBD"
            ) : (
              <Moment format={"DD/MM/YYYY"}>{props.time}</Moment>
            )}
          </Card.Subtitle>
          <Card.Text>{props.location}</Card.Text>
          <button type="submit"> Delete</button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Event;
