const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");
const Network = require("../models/Network");
const Post = require("../models/Post");



exports.getInvitePage = async (req,res) => {
    try {
      const user = await User.findOne({ _id: req.user._id })
   
    //   const userId = user._id
    //   // console.log(userId)
   console.log(req.id)
      const network = await Network.findOne({ name: req.params.id }).lean()
      console.log(network)
      if(!network) return
      res.render('network-invitation.ejs', { network, user })
    }  catch(err) {
      console.error(err)
    }
   }

   exports.postInvitePage = async (req,res) => {
    try {

      // const user = await User.findOne({ userName: req.params.id })
      // const userId = user._id

      const user = req.user._id
      console.log(user)
      const params = await req.params.id
      console.log(req.params.id)
      const invitationTo = await Network.findOne({ name: req.params.id }).lean()
      console.log(invitationTo)
      const invitationToId = invitationTo._id
   
      // const adminNetwork = await Network.findOne({ admins: user }).lean()
    //   const invitee = await req.body.email
    //   console.log(invitationTo)
      // console.log(adminNetwork)
      // if(!adminNetwork) return
    //   if(!invitee) {
        const invitee = await User.findOne({ userName: req.body.userName })
        if(invitee.invitations.includes(invitationToId)) {
            res.redirect('/dashboard')
        }
        invitee.invitations.push(invitationToId)
        
        invitee.update({ 
          $set: {
            notifications: true
          }
         })
        invitee.save()
        console.log('Mission Accomplished!')
        // const filter = invitee.invitations
        // const update = filter.push(req.params.id)
        // await User.findOneAndUpdate({ filter, update })
    //   }
      // sendEmail()
  
      res.redirect('/dashboard')
     
      // res.render('network-invitation.ejs', { invitationTo, adminNetwork })
    }  catch(err) {
      console.error(err)
    }
   }
  
   exports.postAcceptInvitation = async (req,res) => {
    try {
      const invitation = await Network.findOne({ name: req.params.id })
      const user = await User.findOne({ _id: req.user._id })
      const invitationId = invitation._id
      if(user.networks.includes(invitationId)) {
        return 
      }
      console.log('Invitation accepted')
      user.networks.push(invitationId)
      user.invitations.splice(user.invitations.indexOf(invitationId), 1)
      await invitation.update(
        {
          $inc: { numberOfMembers: 1 },
        }, 
        {
          new: true,
        },
        )
        console.log(invitation.numberOfMembers)
      await user.save()
      await invitation.save()
      res.redirect(`/${req.params.id}/feed`)
    }  catch(err) {
      console.error(err)
    }
   }