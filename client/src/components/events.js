import { useState, useEffect } from "react";
import Event from "./event";
import CardGroup from "react-bootstrap/CardGroup";
import AddEvent from "./addevent";

function Events() {
  const [events, setEvents] = useState([]);
  const [icon, setIcon] = useState([]); //cant have a boolean here, need an array of boolean, [true, false, false, etc!!]
  // useEffect(() => {
  //   fetch("http://localhost:8080/api/events")
  //     .then((response) => response.json())
  //     .then((events) => {
  //       setEvents(events);
  //       console.log("Events fetched...", events);
  //     });
  // }, []);
  //if something handles an event its called handle!!!
  const handleFaves = (event) => {
    //default= false
    //when user clicks button then change to true
    if (event === true) {
      setIcon([...true);
        //Question: Post request Add to our to our database because its been favorited!! (favorties table)
        //if false, Delete request to remove it from the second table (favorties table)
    }
  };

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
        body: JSON.stringify(newEvent), //converting the object into a string (anything communicated thru https is thru strings/plain text)-how Browsers communicate
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

  // **************************Testing Delete request in this Events component:
  const deleteEvent = async (id) => {
    //console.log("From the parent", newEvent);
    //this fetch is sending data back to the backend on what the user updated
    //fetch is weird here, it means we are SENDING a delete request to the backend!
    // to delete this event with this id
    try {
      const deleteEvent = await fetch(
        `http://localhost:8080/api/events/${id}`,
        {
          method: "DELETE",
        }
      );
      setEvents(events.filter((events) => events.id !== id));
    } catch (err) {
      console.log(err.message);
    }
  };
  //**********************************End of test.

  return (
    <div>
      <CardGroup className="Events">
        {events.map((event) => (
          <Event
            key={event.id} //to identify each child to help the DOM render it
            id={event.id}
            title={event.title}
            location={event.location}
            time={event.eventtime}
            onDeleteEvent={deleteEvent} //passing in the function from the parent to the child, in order to get it to delete the event!!
            //the name of the prop is onDeleteEvent and the function is deleteEvent
            onFaves={handleFaves}
            faveid={favorites.id}
          />
        ))}
      </CardGroup>
      <AddEvent postRequest={postRequest} />
    </div>
  );
}

export default Events;
