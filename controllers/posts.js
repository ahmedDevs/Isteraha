const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");
const Network = require("../models/Network");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const params = req.params.id
      let isFollower = false
      const profile = await User.findOne({ userName: params }).lean()
      const profileFollowers = profile.followers

      const posts = await Post.find({ user: profile._id }).lean()
      if(params != req.user.userName && profileFollowers.includes(req.user._id)) {
        isFollower = true
      }
      console.log(isFollower)
      res.render("profile.ejs", { profile, user: req.user, posts: posts, isFollower});
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      // const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      let general = false
      const posts = await Post.find().sort({ likes: "desc" }).lean();
      const userIds = posts.map(e => e.user)

      const users = await User.find({ '_id': { $in: userIds } }).lean();
      console.log(users)
  
      const network = await Network.find().sort({ numberOfMemebrs: "desc" }).lean()
    
      // const user = await User.find({ _id: posts.user }).lean()

      // console.log(user)
      // console.log('uuuuuser')
      if(!req.params.id) {
        general = true
      }
      res.render("feed.ejs", { posts: posts, user: req.user, network, general, users });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).lean()
      const poster = await User.findById(post.user).lean()
      const comments = await Comment.find({post: req.params.id}).sort({ createdAt: "desc" }).lean();
      const userIds = comments.map(e => e.user)
      const users = await User.find({ "_id": { $in: userIds } }).lean()   
      const commenters = users.reduce((a,c) => ({...a, [c._id]: c}), {})
      console.log(commenters)
      
      res.render("post.ejs", { post: post, user: req.user, comments: comments, poster, commenters })
      // isLiked?
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary 
      if(req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,  
      });
    }   else {
      await Post.create({
        title: req.body.title,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,  
      });
    } 
      console.log("Post has been added!");
      res.redirect("/profile");
  }  catch (err) {
    console.log(err);
  }
},
  createNetworkPost: async (req,res) => {
    try {
    const params = req.params.id  
    const network = await Network.findOne({ name: params })
    if(req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        network: network._id,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,  
      });
    }  else {
      await Post.create({
        title: req.body.title,
        network: network._id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,  
      });
    }
      console.log(`Post has been added to ${params}`);
      res.redirect(`/${params}/feed`);
  }  catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
      const likeArr = post.likeBy
     
      if(likeArr.includes(req.user._id) === true) {
        await post.updateOne(
          {
            $inc: { likes: -1 },
          },
          {
            new: true,
          },
        ) 
        
        likeArr.splice(likeArr.indexOf(req.user._id),1)
        await post.save()
      }  else { 
        await post.updateOne(
          {
            $inc: { likes: 1 },
          },
          {
            new: true,
          },
        ) 
        
        likeArr.push(req.user._id)
        await post.save()
      }
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById(req.params.id);
      // check if there is an image in the post
      if(post.image) {
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId)
      }
      // Delete post from db
      await Post.deleteOne({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect(`/${req.user.userName}/profile`);
    } catch (err) {
      res.redirect(`/${req.user.userName}/profile`);
    }
  },
};
