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
        return res.status(400).json({ error: "Image ID and User ID are required" });
      }

      const image = await Image.findById(imageId);

      if (!image) {
        return res.status(404).json({ error: "Image not found" });
      }

      if (!image.likes.includes(userId)) {
        return res.status(400).json({ error: "User hasn't liked this image" });
      }

      image.likes = image.likes.filter(like => like.toString() !== userId);

      await image.save();

      res.status(200).json({ likes: image.likes.length });
    } catch (error) {
      res.status(500).json({ error: "An error occurred while processing the dislike" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};
