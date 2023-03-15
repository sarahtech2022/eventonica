import { useState, useEffect } from "react";
import EventCard from "./event";
import CardGroup from "react-bootstrap/CardGroup";
import AddEvent from "./addevent";

function Events() {
  const [events, setEvents] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:8080/api/events")
  //     .then((response) => response.json())
  //     .then((events) => {
  //       setEvents(events);
  //       console.log("Events fetched...", events);
  //     });
  // }, []);

  const getRequest = () => {
    fetch("http://localhost:8080/api/events")
      .then((response) => response.json())
      .then((events) => {
        setEvents(events);
        console.log("Events fetched...", events);
      });
  };

  useEffect(() => {
    getRequest();
  }, []);
  //Three servers- frontend(React), backend, database
  //just sending the users information (the new event added to the backend server)
  const postRequest = (newEvent) => {
    //console.log("From the parent", newEvent);
    //this fetch is sending data back to the backend on what the user updated
    return (
      fetch("http://localhost:8080/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, //Sending it in JSON format
        body: JSON.stringify(newEvent), //converting the object into a string (anything communicated thru https is thru strings/plain text)
      })
        //what we are recieving from the backend, THIS IS giving us the full list after the user added a change!
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          //console.log("From the front", data);
          setEvents((events) => [...events, data]);
          //spread operator- making a copy of all old events into a new array
        })
    );
  };

  return (
    <div>
      <CardGroup className="Events">
        {events.map((event) => (
          <EventCard
            key={event.id}
            title={event.title}
            location={event.location}
            time={event.eventtime}
          />
        ))}
      </CardGroup>
      <AddEvent postRequest={postRequest} />
    </div>
  );
}

export default Events;
