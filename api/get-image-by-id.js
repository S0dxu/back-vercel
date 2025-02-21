const express = require("express");
const Image = require("../models/Image");

const router = express.Router();

router.get("/get-image-by-id/:id", async (req, res) => {
  try {
    const imageId = req.params.id;
    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    image.views += 1;
    await image.save();

    res.json({
      _id: image._id,
      url: image.url,
      author: image.author,
      date: image.date,
      title: image.title,
      songname: image.songname,
      songlink: image.songlink,
      tags: image.tags,
      views: image.views,
      likes: image.likes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch image by ID" });
  }
});

module.exports = router;
