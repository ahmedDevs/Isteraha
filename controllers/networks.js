const Network = require("../models/Network")
const User = require("../models/User")
const cloudinary = require("../middleware/cloudinary");

module.exports = {
   createNetwork: async (req,res) => {
    try {
        // const param = await Network.findOne({ name: req.body.networkName })
        // if(req.user.file) {
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
        //  }  
        
        // else {
        //     await Network.create({
        //         name: req.body.networkName,
        //         slogan: req.body.slogan,
        //         about: req.body.description,
        //         type: req.body.type,
        //         foundHow: req.body.how,
        //         createdBy: req.user.id,
        // })
        // }
          const user = await User.findOne({ _id: req.user._id })
          const network = await Network.findOne({ name: req.body.networkName})
          user.networks.push(network._id)
          network.members.push(req.user._id)
          await user.save()
          await network.save()
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
    let isAuth = ''
    if(req.user) {
    isAuth = true
    // const userNetworks = await Network.find({ _id: { "$elemMatch" : req.user.networks } }).lean()
    const userNetworks = await Network.find({ _id: { $in: req.user.networks } }).lean()
    console.log(userNetworks)
    const networks = await Network.find({ type: 'Public'}).lean()
    res.render('network-page.ejs', { networks, user: req.user, isAuth,  userNetworks: userNetworks})
    }  else if(!req.user) {
        isAuth = false
        const networks = await Network.find({ type: 'Public'}).lean()
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
   putUserSettings: async(req,res) => {
    try {
        if(req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        }
        const user = await User.findById(req.user._id)
        if(req.body.name && req.body.bio && result) {
        await user.update(
            {
                $set: { image: result.secure_url, cloudinaryId: result.public_id, name: req.body.name, bio: req.body.bio },
            },
        )
        }  
           
        // await Post.create({
        //   title: req.body.title,
        //   image: result.secure_url,
        //   cloudinaryId: result.public_id,
        //   caption: req.body.caption,
        //   likes: 0,
        //   user: req.user.id,  
        // });
      

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
        console.log(members)
        const following = await User.find({ "followers": { $in: user._id } }).lean()
        const followingObj = following.reduce((a, v) => ({...a, ...v}), {});
        console.log(followingObj)
        res.render("members.ejs", { members: members, user, network, followingObj })
    }  catch(err) {
        console.error(err)
    }
   },
   postRemoveUser: async (req,res) => {
        try { 
            const network = await Network.findOne({ name: req.params.network })
            const user = await User.findOne({ userName: req.params.user })
            network.members.splice(network.members.indexOf(user._id), 1)

            // await network.update(
            //     {
            //         $inc: { numberOfMembers: -1 },
            //     },
            //     {
            //         new: true,
            //     },
            // )
            
            user.networks.splice(user.networks.indexOf(network._id), 1)
            await network.save()
            await user.save()
            res.redirect(`/network/${req.params.network}/members`)
        }  catch(err) {
            console.error(err)
        }
   }
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
