const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");
const Network = require("../models/Network");
const Post = require("../models/Post");
const Comment = require("../models/Comment")
// const { findOne } = require("../models/User");

// const nodemailer = require('nodemailer');
// const sendEmail = require("../config/mail")()


exports.getLogin = async (req, res) => {
  console.log(req.user)
  if (req.user) {
    // return res.redirect("/profile");
    const userName = req.user.userName
    // console.log(userName)
    return res.redirect('/dashboard');
  }
  res.render("login", {
    title: "Login",
  });
};

exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || '/dashboard');
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect(`/${req.user.userName}/profile`);
  }
  res.render("signup", {
    title: "Create Account",
  });
};

exports.getDashboard = async (req,res) => {
  try {
      const user = req.user
      // const networks = await Network.find({ createdBy: user._id }).lean()
      const memberOf = await Network.find({ _id: user.networks}).lean()
      
      console.log(memberOf)
    // console.log(networks)
      console.log(user)
      res.render('dashboard', { user, memberOf}) 
      // console.log(user)
  } catch(err) {
      console.error(err)
  }
 };

//  exports.getUserProfile = async (req,res) => {
//   try {
//     const user = await User.findOne({ userName: req.params.id }).lean()
//     res.render('user-profile', { user })
//   }  catch(err) {
//     console.error(err)
//   }
//  }


 exports.getNetworkFeed = async (req,res) => {
  try {
    const param = req.params.id
    const network = await Network.findOne({ name: param }).lean()
    // const user = await User.findById(req.user._id).lean()
    const networkId = network._id
    const members = await User.find({ 'networks': { $in: networkId } }).limit(5).lean()
    if(network.type == 'Private' && network.createdBy != req.user._id && network[members.includes(req.user._id)] == false) {
      return res.redirect('/dashboard')
    }
    // if(req.user.networks.includes(networkId) || network.type == 'Public' || network.createdBy == req.user._id) {

    //     return res.redirect('/dashboard')
    
    const posts = await Post.find({ network: networkId}).sort({ likes: "desc" }).lean();
    const networkFeed = true
    // const uniqueUserIds = [...new Set(userIds)]

    // const users = await User.find({ '_id': { $in: userIds } }).lean();
    const users = await User.find({ networks: networkId }).lean()
    const userIds = posts.map(e => e.user)
    const posters = await User.find({ '_id': { $in: userIds } }).lean()
    const hashMap = {}
    for(let i = 0; i < posters.length; i++) {
      if(hashMap[posters[i]._id] !== undefined) {
        break
      }
      hashMap[posters[i]._id] = posters[i]
    }
  
     //  things.find({tennants: mongoose.Types.ObjectId("123")});
   
    // console.log(members)
    const comments = await Comment.find({ 'post': { $in: posts } }).lean()
    res.render("feed", { posts: posts, user: req.user, users: users, network, members: members, hashMap, networkFeed });

  }  catch(err) {
    console.error(err)
  }
 }

 exports.getNotifications = async (req,res) => {
  try {
    const user = await User.findOne({ userName: req.params.id }).lean()
  
    const userId = user._id
    const networks = user.invitations
    // console.log(networks)
  
     const network = await Network.find({ _id: { "$in" : networks } }).lean()
    // const network = await Network.find({ _id: { "$in" : [invitations]} }).lean()
    // console.log(network)
    // const networksInfo = []
    // for(let i = 0; i < networks.length; i++) {
    //   networksInfo.push( await Network.findOne({ _id: networks[i] }))
    
    // }

    // const network = await Network.findOne({ createdBy: userId }).lean()
    // console.log(network)


    res.render('notifications', { user, network })
  }  catch(err) {
    console.error(err)
  }
 }


exports.postFollow = async (req,res) => {
  try {
    const params = req.params.id
    const follower = await User.findById(req.user._id)
    const followed = await User.findOne({ userName: params })
    follower.following.push(followed._id)
    followed.followers.push(follower._id)
    
    await follower.save()
    await followed.save()
    res.redirect(`/${params}/profile`)

  }  catch(err) {
    console.error(err)
  }

}

exports.postUnfollow = async (req,res) => {
  try {
    const params = req.params.id
    const unfollower = await User.findById(req.user._id)
    const unfollowed = await User.findOne({ userName: params })
    unfollower.following.splice(unfollower.following.indexOf(unfollowed._id), 1)
    unfollowed.followers.splice(unfollowed.followers.indexOf(unfollower._id), 1)
    await unfollower.save()
    await unfollowed.save()
    res.redirect(`/${params}/profile`)
   
  }  catch(err) {
    console.error(err)
  }
}

exports.postSearchUsernames = async (req,res) => {
  try {
    let search = await req.body.search.trim()
    let user = await User.find({ userName: { $regex: new RegExp('^'+search+'.*','i') } }).exec()
    // limit search results to 10
    user = user.slice(0,10)
    res.send({ search: user })

    console.log(search)
  }  catch(err) {
    console.error(err)
  } 
 
}


//  exports.postInviteUser = async (req,res) => {
//   try {
  
//       const invitedUserEmail = await req.body.email
//       const invitedUser = await findOne({ email: invitedUserEmail })
//       await User.findOneAndUpdate({ email: invitedUserEmail, invitedUser.networks.push('testing') })
//   }  catch(err) {
//     console.error(err)
//   }
//  }

exports.postSignup = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    userName: req.body.userName,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("../signup");
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect(`${req.body.userName}/profile`);
        });
      });
    }
  );
};


















