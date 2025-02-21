const express = require("express");
const cors = require("cors");
require("dotenv").config();

const getRandomImage = require("./api/get-random-image");
const getImageById = require("./api/get-image-by-id");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running on Vercel!");
});

app.use("/", getRandomImage);
app.use("/", getImageById);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
