const mongoose = require("mongoose");
const Image = require("../models/Image");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = async (req, res) => {
  const beforeDate = req.query.before;
  const limit = 4;

  const query = beforeDate ? { date: { $lt: new Date(beforeDate) } } : {};
  const images = await Image.find(query).sort({ date: -1 }).limit(limit);

  res.json(images);
};
