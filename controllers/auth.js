const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");
const Network = require("../models/Network");
// const { findOne } = require("../models/User");

exports.getLogin = async (req, res) => {
  if (req.user) {
    // return res.redirect("/profile");
    const userName = req.user.userName
    console.log(userName)
    return res.redirect(`${userName}/dashboard`);
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
      res.redirect(req.session.returnTo || "/dashboard");
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
    return res.redirect("/profile");
  }
  res.render("signup", {
    title: "Create Account",
  });
};

exports.getDashboard = async (req,res) => {
  try {
      const user = await User.findOne({ userName: req.params.id }).lean()
      console.log(user)
      res.render('dashboard.ejs', { user }) 
      console.log(user)
  } catch(err) {
      console.error(err)
  }
 };

//  exports.getUserProfile = async (req,res) => {
//   try {
//     const user = await User.findOne({ userName: req.params.id }).lean()
//     res.render('user-profile.ejs', { user })
//   }  catch(err) {
//     console.error(err)
//   }
//  }

 exports.getInvitePage = async (req,res) => {
  try {
    const user = await User.findOne({ userName: req.params.id })
    const userId = user._id
    console.log(userId)
    const network = await Network.findOne({ createdBy: userId }).lean()
    console.log(network)
    if(!network) return
    res.render('network-invitation.ejs', { network })
  }  catch(err) {
    console.error(err)
  }
 }

 exports.getNotifications = async (req,res) => {
  try {
    const user = await User.findOne({ userName: req.params.id }).lean()
  
    const userId = user._id
    const networks = user.networks

    const networksInfo = 0
    for(let i = 0; i < networks.length; i++) {
      networksInfo.push( await Network.findOne({ _id: networks[i] }))
    
    }
    console.log(networksInfo)
    console.log(userId)
    console.log(user)
    console.log(networks)
    // const network = await Network.findOne({ createdBy: userId }).lean()
    // console.log(network)
    res.render('notifications.ejs', { user, networks })
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
          res.redirect("/profile");
        });
      });
    }
  );
};







// const LocalStrategy = require("passport-local").Strategy;
// const mongoose = require("mongoose");
// const Model = require('../models/ModelSchema.js')
// const Stylist = require('../models/StylistSchema.js')

// module.exports = function (passport) {
//   passport.use(
//     new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
//       Model.findOne({ email: email.toLowerCase() }, (err, user) => {
//         if (err) {
//           return done(err);
//         }
//         if (!user) {
//           Stylist.findOne({ email: email.toLowerCase() }, (err, user) => {
//             if (err) {
//               return done(err);
//             }
//             if (!user) {
//               return done(null, false, { msg: `Email ${email} not found.` });
//             }
//             if (!user.password) {
//               return done(null, false, {
//                 msg:
//                   "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
//               });
//             }
//             user.comparePassword(password, (err, isMatch) => {
//               if (err) {
//                 return done(err);
//               }
//               if (isMatch) {
//                 return done(null, user);
//               }
//               return done(null, false, { msg: "Invalid email or password." });
//             });
//           });
//           // return done(null, false, { msg: `Email ${email} not found.` });
//         }
//         if (!user.password) {
//           return done(null, false, {
//             msg:
//               "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
//           });
//         }
//         user.comparePassword(password, (err, isMatch) => {
//           if (err) {
//             return done(err);
//           }
//           if (isMatch) {
//             return done(null, user);
//           }
//           return done(null, false, { msg: "Invalid email or password." });
//         });
//       });
//     })
//   );

//   passport.serializeUser((user, done) => {
//     done(null, user.id);
//   });

//   passport.deserializeUser((id, done) => {
//     User.findById(id, (err, user) => done(err, user));
//   });
// };