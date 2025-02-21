const express = require("express");
const cors = require("cors");
require("dotenv").config();

const getRandomImage = require("./api/get-random-image");
const getImageById = require("./api/get-image-by-id");

const app = express();

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running on Vercel!");
});

app.use("/get-random-image", getRandomImage);
app.use("/get-image-by-id", getImageById);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
