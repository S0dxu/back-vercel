const mongoose = require("mongoose");
const Image = require("../model/Image");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { imageId, userId } = req.body;

      if (!imageId || !userId) {
        return res.status(400).json({ error: "Both imageId and userId are required" });
      }

      const image = await Image.findById(imageId);
      if (!image) {
        return res.status(404).json({ error: "Image not found" });
      }

      image.likes.push(userId);
      await image.save();

      res.status(200).json({ message: "Like added successfully", likes: image.likes.length });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while adding the like" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};
