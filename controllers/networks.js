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
    const user = await User.findOne({ userName: req.user.userName }).lean()
    res.render('network.ejs', { user })
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
   }
//    getDashboard: async (req,res) => {
//     try {
       
//         const network = await Network.find({ name: req.params.id })
//         res.render('dashboard.ejs', { network: network })
//     } catch(err) {
//         console.error(err)
//     }
    
//    },



}
