/* eslint linebreak-style: ["error", "windows"] */

import express from "express";
import morgan from "morgan";
import "babel-polyfill";

import cors from "cors";
import path from "path";
import exphbs from "express-handlebars";
import bodyParser from "body-parser";
// import routes
import routersV2 from "./routes/v2/index";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));

// Parse incoming request bodies in a middleware

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const hbs = exphbs.create();
app.set("views", path.join(__dirname, "views"));

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    partialsDir: ["views/includes/"]
  })
);

app.set("view engine", "handlebars");

// Register `hbs.engine` with the Express app.
app.engine("handlebars", hbs.engine);
// CORS
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});
// Welcome controller
app.get("/", (req, res) => {
  res.status(200).render("index");
});

// let express use routes
app.use("/api/v2/", routersV2);

app.listen(PORT, () => {
  console.log(`Server started with Port: ${PORT}`);
});

export default app;
