const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

//configure the port
require("dotenv").config();
const port = process.env.PORT;

// view engine
app.set("view engine", "ejs");

//database connection
const dbURI = process.env.DB_URL;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(port, console.log(`running on ${port}`)))
  .catch((err) => console.log(`error ${err}`));

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/cocktail", requireAuth, (req, res) => res.render("cocktail"));
app.use(authRoutes);

///
