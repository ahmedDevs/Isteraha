const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    // require: true,
  },
  network: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Network",
  },
  cloudinaryId: {
    type: String,
    // require: true,
  },
  caption: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  likedBy: {
    type: Array,
  },
  comments: {
    type: Array,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Post", PostSchema)
