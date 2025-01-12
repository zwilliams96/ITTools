const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");
const logger = require("./middlewares/logger");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5050;

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  optionsSuccessStatus: 200,
};

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(express.static("static"));
app.use(logger); // Logging middleware

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});
app.get("/sncalc", (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'subnetcalc.html'));
});
app.get("/clock", (req, res) => {
  res.sendFile(path.join(__dirname, 'static', 'clock.html'));
});

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
