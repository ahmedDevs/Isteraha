const mongoose = require("mongoose")

const ModerateSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
    },
    moderatorAt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Network",
    }
})

module.exports = mongoose.model("Moderate", ModerateSchema, 'moderators')