import express from "express";
import {
  getActors,
  getActor,
  createActor,
  getTop5RentedFilms,
  getFilmDetails,
} from "./database.js";
import cors from "cors";

const app = express();

// cors needed for different origins (between frontend and backend)
app.use(cors());
// parse json body for post requests.
app.use(express.json());

app.get("/films/top5", async (req, res) => {
  const films = await getTop5RentedFilms();
  res.send(films);
});

// spaces can be represented by %20
app.get("/films/:title", async (req, res) => {
  const title = req.params.title;
  const film = await getFilmDetails(title);
  res.send(film);
});

app.get("/actors", async (req, res) => {
  // actors will be JSON
  const actors = await getActors();
  res.send(actors);
});

app.get("/actors/:id", async (req, res) => {
  const id = req.params.id;
  const actor = await getActor(id);
  res.send(actor);
});

app.post("/actors", async (req, res) => {
  const { first_name, last_name } = req.body;
  const actor = createActor(first_name, last_name);
  res.status(201).send(actor);
});

// error middleware
// https://expressjs.com/en/guide/error-handling.html
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Womp womp... something broke...");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
