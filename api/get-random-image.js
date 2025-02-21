const express = require("express");
const Image = require("../models/Image");

const router = express.Router();

router.get("/get-random-image", async (req, res) => {
  try {
    const totalImages = await Image.countDocuments();
    
    if (totalImages === 0) {
      return res.status(404).json({ error: "0 image found" });
    }

    const randomIndex = Math.floor(Math.random() * totalImages);
    const randomImage = await Image.findOne().skip(randomIndex);

    randomImage.views += 1;
    await randomImage.save();
    
    res.json({
      _id: randomImage._id,
      url: randomImage.url,
      author: randomImage.author,
      date: randomImage.date,
      title: randomImage.title,
      songname: randomImage.songname,
      songlink: randomImage.songlink,
      tags: randomImage.tags,
      views: randomImage.views,
      likes: randomImage.likes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching a random image" });
  }
});

module.exports = router;
