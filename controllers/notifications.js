
const User = require("../models/User");
const Network = require("../models/Network");



module.exports = {
    getNotifications: async (req,res) => {
        console.log('hey, does this work?')
        try {

        const user = await User.findOne({ userName: req.params.id }).lean()
        console.log(user)
        }  catch(err) {
            console.error(err)
        }
    },
}
  