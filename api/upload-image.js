const mongoose = require("mongoose");
const Image = require("../models/Image");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { url, author, title, songname, songlink, tags } = req.body;

      if (!url || !author || !title || !tags) {
        return res.status(400).json({ error: "all fields are mandatory" });
      }

      const newImage = new Image({
        url,
        author,
        date: new Date(),
        title,
        songname,
        songlink,
        tags
      });

      await newImage.save();
      res.status(201).json({ message: "yep!", image: newImage });
    } catch (error) {
      res.status(500).json({ error: "nope!" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};
