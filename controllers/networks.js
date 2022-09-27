const cloudinary = require("../middleware/cloudinary");
const Network = require("../models/Network")

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
            private: req.body.kind,
            type: req.body.type,
            foundHow: req.body.how,
            customFeatures: req.body.custom,
            createdBy: req.user.id,
          })
          const param = await req.body.networkName
          console.log("Network created!");
          res.redirect(`/${param}`);
    
    } catch (err) {
        console.error(err)
    }
   },
   getNetworkPage: (req,res) => {
    res.render('network.ejs')
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
