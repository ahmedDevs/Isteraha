const cloudinary = require("../middleware/cloudinary");
const Network = require("../models/Network")
const User = require("../models/User")

module.exports = {
   createNetwork: async (req,res) => {
    // console.log(req.body)
    console.log(req.user.id)
    
    try {
        // const param = await Network.findOne({ name: req.body.networkName })
        const result = await cloudinary.uploader.upload(req.file.path);
        await Network.create({
            name: req.body.networkName,
            logo: result.secure_url,
            cloudinaryId: result.public_id,
            slogan: req.body.slogan,
            about: req.body.description,
            // private: req.body.kind,
            // type: req.body.type,
            // foundHow: req.body.how,
            // customFeatures: req.body.custom,
            createdBy: req.user.id,
          })
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
//    getDashboard: async (req,res) => {
//     try {
       
//         const network = await Network.find({ name: req.params.id })
//         res.render('dashboard.ejs', { network: network })
//     } catch(err) {
//         console.error(err)
//     }
    
//    },

}
