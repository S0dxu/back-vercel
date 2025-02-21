const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: String,
  author: String,
  date: Date,
  title: String,
  songname: String,
  songlink: String,
  tags: Array,
  views: { type: Number, default: 0 },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
