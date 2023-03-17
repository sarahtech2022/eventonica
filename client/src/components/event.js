import Card from "react-bootstrap/Card";
import Moment from "react-moment";
import { useState } from "react";
import { useEffect } from "react";

const Event = (props) => {
  const [isFaved, setIsFaved] = useState(props.eventFave);

  // useEffect(() => {
  //   props.onFaves(props.id, isFaved);
  // }, [isFaved]);

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

          <button type="submit" onClick={() => setIsFaved(!isFaved)}>
            Fave/Unfave
          </button>
          <p>This event is {isFaved ? " " : "not "}my favourite</p>

          <span>
            {" "}
            {isFaved ? (
              <img
                id="hearticon"
                src="https://thenounproject.com/api/private/icons/14447/edit/?backgroundShape=SQUARE&backgroundShapeColor=%23000000&backgroundShapeOpacity=0&exportSize=752&flipX=false&flipY=false&foregroundColor=%23000000&foregroundOpacity=1&imageFormat=png&rotation=0&token=gAAAAABkE-ELXVTBPhYHDTBt2GJZl_M_tUixiubVEhA5GlZrFLGaZWxKAZc3lRUnB_hiBD3QY0FonwbQr2qvLFcG_g-FVauxyQ%3D%3D"
              ></img>
            ) : (
              " "
            )}
          </span>

          <span>{props.fave}</span>
          {/* I think????: ternary operator here to get icon to display using the useState? */}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Event;
