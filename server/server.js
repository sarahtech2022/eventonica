//This is the minimal express server.
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const db = require("../server/db/db-connection.js");
const { Pool } = require("pg");

const app = express();
const PORT = 8080;

// Configuring cors middleware
app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// //creates an endpoint for the route `/`
app.get("/", (req, res) => {
  res.json("Hello Techtonica Server for an app with Events");
});

app.get("/api/events", async (req, res) => {
  //real connection with the DB eventonica
  try {
    const { rows: events } = await db.query("SELECT * FROM events"); //this is including the fave column!! so we can use the same state
    res.send(events);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error });
  }

  //hardcode the events response for testing reasons. This call has one more event that the real DB
  // const events = [

  //     {id: 1, title: 'Women in Tech Techtonica Panel', location: 'Overland Park Convention Center'},
  //     {id: 2, title: 'Japanese Cultural Education', location: 'Seattle Convention Center'},
  //     {id: 3, title: "Haven 90's Party Night Club", location: 'Hilton Hotel Kansas City'},
  //     {id: 4, title: 'Comedy Night at the Station', location: 'SF Hilton Hotel'},
  //     {id: 5, title: 'A Decadent Arts Experience', location: 'West Ridge Mall'},
  //     {id: 6, title: 'Techtonica Classroom Course', location: 'Techtonica HQ'}
  //   ];
  // res.json(events);
});

app.post("/api/events", async (req, res) => {
  //TO - DO - At the end => save this event to the db
  //INSERT INTO events (title, location, eventtime) VALUES ('Women in Tech Techtonica Panel', 'Overland Park Convention Center', '2023-04-21')
  try {
    const newEvent = {
      title: req.body.title,
      location: req.body.location,
      eventtime: req.body.eventtime,
    };
    const result = await db.query(
      "INSERT INTO events(title, location, eventtime) VALUES ($1, $2, $3) RETURNING *",
      [newEvent.title, newEvent.location, newEvent.eventtime]
    );
    let response = result.rows[0];
    console.log(response);
    res.json(response);
  } catch (e) {
    console.error(error);
    return res.status(400).json({ error });
  }
});

app.delete("/api/events/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteEvent = await db.query("DELETE FROM events WHERE id= $1", [id]);
    //SQL query parameters can be used with $ dollar sign, will take the actual value of the id
    res.json("Event was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/api/events/:id/", async (req, res) => {
  //id and fave are giving ur computer info he stuff before is arbitray
  //conflicts can happen with the same METHOD (but diff methods not conflicts really)
  try {
    console.log("PUT Request is working");
    const { id } = req.params;
    const { fave } = req.body;
    const updateFaves = await db.query(
      //why is it declared but never read?
      "UPDATE events SET fave= $1 WHERE id=$2",
      [fave, id]
    );
    res.json("Event's fave was updated");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(PORT, () =>
  console.log(`Hola! Server running on Port http://localhost:${PORT}`)
);
