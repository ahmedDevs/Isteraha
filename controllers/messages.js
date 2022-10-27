const User = require("../models/User");
const Network = require("../models/Network");
const Message = require("../models/Message");


exports.getMessageUser = async (req,res) => {
    try {
    const params = req.params._id
   
      let sent = true
      let received = true
      // const receiver = await User.findOne({ name: req.params.id }).lean()st user = await User.findById(req.user._id).lean()
      const otherEnd = await User.findOne({ name: params }).lean()
      const messagesTo = await Message.find({ $and: [ {sentTo: req.user._id}, {sentBy: otherEnd._id} ] }).sort({ createdAt: "desc" }).lean() 
      const messagesFrom = await Message.find({ $and: [ {sentBy: req.user._id}, {sentTo: otherEnd._id} ] }).sort({ createdAt: "desc" }).lean() 
      if(!messagesTo) received = false
      if(!messagesFrom) sent = false

      // if(messagesTo === null && messagesFrom === null) {
      //   return res.render("messages.ejs", { params, user: req.user, sent, received, otherEnd})
      // }  else if(messagesTo === null) {
      //   return res.render("messages.ejs", { params, user: req.user, sent, received, otherEnd, messagesFrom: messagesFrom})
      // }  else if(messagesFrom === null) {
      //   return res.render("messages.ejs", { params, user: req.user, sent, received, otherEnd, messagesTo: messagesTo})
      // }
      // console.log(received)
      // console.log(sent)
      // console.log(messagesFrom)
      // console.log(messagesTo)
     
       
        res.render("messages.ejs", { params, user: req.user, messagesTo: messagesTo, messagesFrom: messagesFrom, sent, received, otherEnd })
      }  catch(err) {
        console.error(err)
      }
}

exports.postMessageUser = async (req,res) => {
    try {
      const userName = req.body.userName
      const message = req.body.message

      const receiver = await User.findOne({ userName: userName }).lean()
      const sender = await User.findById(req.user._id).lean()
      const newMessage = await Message.create({
        message: message,
        sentBy: sender._id,
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