const User = require("../models/User");
const Network = require("../models/Network");
const Message = require("../models/Message");


exports.getMessageUser = async (req,res) => {
    try {
      const params = req.params.id
      const receiver = await User.findOne({ name: req.params.id }).lean()
      const user = await User.findById(req.user._id).lean()
      // const messages = await Message.find({ 
      //     $and: [{
      //       sentBy: user._id 
      //     },
      //     {
      //       sentTo: receiver._id 
      //     }
      //   ],
       
      // }).lean()
       
        res.render("messages.ejs", { params, user })
      }  catch(err) {
        console.error(err)
      }
}

exports.postMessageUser = async (req,res) => {
    try {
      const receiver = await User.findOne({ userName: req.params.id }).lean()
      const sender = await User.findById(req.user._id).lean()
      const newMessage = await Message.create({
        message: req.body.message,
        sentBy: req.user._id,
        sentTo: receiver._id,
    })
      console.log(newMessage)
      res.redirect(`/message/${receiver}`, { newMessage, sender })
        
      }  catch(err) {
        console.error(err)
      }
}

exports.getMessagePage = async (req,res) => {
    try {
        const user = req.user
        res.render("messages.ejs", { user })
      }  catch(err) {
        console.error(err)
      }
}