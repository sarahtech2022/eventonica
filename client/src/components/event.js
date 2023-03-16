import Card from "react-bootstrap/Card";
import Moment from "react-moment";
import { useState } from "react";

const Event = (props) => {
  //**** Our though process on how to get the ID and update the state and then
  //delete it on events:
  //const [getId, setGetId] = useState(null);
  //getIdMethod will get the ID using SELECT FROM database (it will know which ID because key=event.id- this is attached to each card)
  //The setGetID will update the state which we then pass to the parent to tell it to delete that card
  //***
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
          <p>Event Id:{props.id}</p>
          <button type="submit" onClick={() => props.onDeleteEvent(props.id)}>
            {" "}
            Delete
          </button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Event;
