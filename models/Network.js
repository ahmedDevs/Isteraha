const mongoose = require("mongoose")

const NetworkSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
      },
     logo: {
        type: String,
        // require: true,
      },
      cloudinaryId: {
        type: String,
        // require: true,
      },
      slogan: {
        type: String,
        // required: true,
      },
      members: {
        type: Array,

      },
      invitationCode: {
        type: String,

      },
      // private: {
      //   type: Boolean,
      //   required: true,
      // },
      type: {
        type: String,
        required: true,
      },
      foundHow: {
        type: String,
        required: true,
      },
      customFeatures: {
        type: String,
        // required: true,
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      dateCreated: {
        type: Date, 
        default: Date.now,
      },
      numberOfMembers: {
        type: Number,
        default: 0,
      },
      admins: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      moderators: {
        type: Object,
      },
})

module.exports = mongoose.model("Network", NetworkSchema, 'networks')