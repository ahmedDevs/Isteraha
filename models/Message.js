// const { ObjectId } = require("mongodb")
const mongoose = require("mongoose")

const MessageSchema = new mongoose.Schema ({
   message: {
    type: String,
    required: true,
   },
   sentBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
   },
   sentTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
   },
   createdAt: {
    type: Date,
    default: Date.now,
  },
  // isReply: {
  //   type: Boolean,
  // },
  // replyTo: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
})

module.exports = mongoose.model("Message", MessageSchema, 'messages')