const Network = require("../models/Network")
const User = require("../models/User")
const cloudinary = require("../middleware/cloudinary");

module.exports = {
   createNetwork: async (req,res) => {
    // console.log(req.body)
    console.log(req.user.id)
    
    try {
        // const param = await Network.findOne({ name: req.body.networkName })
        if(req.user.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        await Network.create({
            name: req.body.networkName,
            logo: result.secure_url,
            cloudinaryId: result.public_id,
            slogan: req.body.slogan,
            about: req.body.description,
            type: req.body.type,
            foundHow: req.body.how,
            // customFeatures: req.body.custom,
            createdBy: req.user.id,
          })
        }   else {
            await Network.create({
                name: req.body.networkName,
                slogan: req.body.slogan,
                about: req.body.description,
                type: req.body.type,
                foundHow: req.body.how,
                createdBy: req.user.id,
        })
        }
          const user = await User.findOne({ _id: req.user._id })
          const network = await Network({ name: req.body.networkName})
          user.networks.push(network._id)
          network.members.push(req.user._id)
          console.log(user)
          console.log(network)
          const param = await req.body.networkName
          console.log("Network created!");
          res.redirect(`/${param}/feed`);
 
    
    } catch (err) {
        console.error(err)
    }
   },
   getNetworkPage: async (req,res) => {
    try {
        const user = await User.findOne({ userName: req.user.userName }).lean()
        res.render('network.ejs', { user })
    }  catch(err) {
        console.error(err)
    }
   },

   getNetworks: async (req,res) => {
    if(req.user) {
    let isAuth = true
    // const userNetworks = await Network.find({ _id: { "$elemMatch" : req.user.networks } }).lean()
    const userNetworks = await Network.find({ _id: { $in: req.user.networks } }).sort({ numberOfMembers: "desc" }).lean()
    console.log(userNetworks)
    const networks = await Network.find({ type: 'Public'}).sort({ numberOfMembers: "desc" }).lean()
    res.render('network-page.ejs', { networks, user: req.user, isAuth,  userNetworks: userNetworks})
    }  else if(!req.user) {
        isAuth = false
        const networks = await Network.find({ type: 'Public'}).sort({ numberOfMembers: "desc" }).lean()
        res.render('network-page.ejs', { networks, isAuth })
    }
   },
   getNetworkSettings: async (req,res) => {
    try {
        const network = await Network.findOne({ name: req.params.id }).lean()
        res.render('settings.ejs', { network })
    }  catch(err) {
        console.error(err)
    }
   },
   postNetworkSettings: async (req,res) => {
    try {
        const network = await Network.findOne({ name: req.params.id })
        if(req.user.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
          
            await Network.findOneAndUpdate(
                { name: req.params.id },
                {
                 $set: { name: req.body.networkName, logo: req.body.logo, cloudinaryId: result.public_id, slogan: req.body.slogan, type: req.body.type }
                },
                { new: true }
              )
            } 
           
        
    }  catch(err) {
        console.error(err)
    }
   },
   getUserSettings: async(req,res) => {
    try {
        const user = req.user
        res.render('settings.ejs', user)
    }  catch(err) {
        console.error(err)
    }
   },
   postUserSettings: async(req,res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const user = await User.findById(req.user._id)

    }  catch(err) {
        console.error(err)
    }
   },
   postLeaveNetwork: async(req,res) => {
    try {
        const network = await Network.findOne({ name: req.params.id }).lean()
        const user = await User.findById(req.user._id)
        const networksArr = user.networks
        networksArr.splice(networksArr.indexOf(network._id), 1)
        await user.save()
        res.redirect('/dashboard')
    }  catch(err) {
        console.error(err)
    }
   },
   getMembersPage: async (req,res) => {
    try {
       
        const user = req.user
        const network = await Network.findOne({ name: req.params.id }).lean()
        const members = await User.find({ "networks": { $in: network._id } }).lean()
        const following = await User.find({ "followers": { $in: user._id } }).lean()
        const followingObj = following.reduce((a, v) => ({...a, ...v}), {});
        console.log(followingObj)
        res.render("members.ejs", { members: members, user, network, followingObj })
    }  catch(err) {
        console.error(err)
    }
   },

//    getProfile: async (req, res) => {
//     try {
//       const params = req.params.id
//       let isFollower = false
//       const profile = await User.findOne({ userName: params }).lean()
//       const profileFollowers = profile.followers

//       const posts = await Post.find({ user: profile._id }).lean()
//       if(params !== req.user.userName && profileFollowers.includes(req.user._id)) {
//         isFollower = true
//       }
//       console.log(isFollower)
//       res.render("profile.ejs", { profile, user: req.user, posts: posts, isFollower});
//     } catch (err) {
//       console.log(err);
//     }
//   },

//    getDashboard: async (req,res) => {
//     try {
       
//         const network = await Network.find({ name: req.params.id })
//         res.render('dashboard.ejs', { network: network })
//     } catch(err) {
//         console.error(err)
//     }
    
//    },



}
