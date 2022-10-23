const mongoose = require("mongoose")

const NetworkSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        unique: true,
      },
     logo: {
        type: String,
        required: true,
      },
      about: {
        type: String,
        required: true,
      },
      cloudinaryId: {
        type: String,
        required: true,
      },
      slogan: {
        type: String,
        required: true,
        // required: true,
      },
      members: {
        type: Array,
      },
      // numberOfMembers: {
      //   type: Number,
      //   default: 0,
      // },
      invitationCode: {
        type: String,

      },
      // private: {
      //   type: Boolean,
      //   required: true,
      // },
      type: {
        type: String,
        // required: true,
      },
      foundHow: {
        type: String,
        // required: true,
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

})

module.exports = mongoose.model("Network", NetworkSchema, 'networks')