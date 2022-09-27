const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema ({
    comment: {
        type: String,
        require: true,
    },
    likes: {
        type: Number,
        required: true,
    },
    likedBy: {
        type: Array,
    },
    replies: {
        type: Array,
    },
})

module.exports = mongoose.model("Comment", CommentSchema, 'comments')