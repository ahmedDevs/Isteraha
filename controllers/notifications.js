
const User = require("../models/User");
const Network = require("../models/Network");
const Message = require("../models/Message");


// module.exports = {
//     getNotifications: async (req,res) => {
//         console.log('hey, does this work?')
//         try {

//         const user = await User.findOne({ userName: req.params.id }).lean()
//         console.log(user)
//         }  catch(err) {
//             console.error(err)
//         }
//     },
// }

exports.getNotifications = async (req,res) => {
    try {
      const user = await User.findOne({ _id: req.user._id }).lean()
      
    //   const userId = user._id
      const networks = user.invitations
      // console.log(networks)
    
       const network = await Network.find({ _id: { "$in" : networks } }).lean()
       const messages = await Message.find({ sentTo: user._id }).lean()
       const sendersIds = messages.map(e => e._id)
       console.log(sendersIds)
       const senders = await User.find({ _id: { "$in": sendersIds } }).lean()
       console.log(senders)
   
      // const network = await Network.find({ _id: { "$in" : [invitations]} }).lean()
      // console.log(network)
      // const networksInfo = []
      // for(let i = 0; i < networks.length; i++) {
      //   networksInfo.push( await Network.findOne({ _id: networks[i] }))
      
      // }
      // const network = await Network.findOne({ createdBy: userId }).lean()
      // console.log(network)
  
  
      res.render('notifications.ejs', { user, network, messages, senders })
    }  catch(err) {
      console.error(err)
    }
   }
  
  