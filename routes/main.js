const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
// const networksController = require("../controllers/networks")
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, postsController.getProfile);
router.get("/feed", ensureAuth, postsController.getFeed);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

// test

router.get("/:id/dashboard", ensureAuth, authController.getDashboard);

router.get("/:id/dashboard/inviteUser", ensureAuth, authController.getInvitePage);

// router.post("/:id/dashboard/inviteUser/:id", ensureAuth, authController.postInviteUser);



router.get("/:id/notifications", ensureAuth, authController.getNotifications);

// router.get("/:id/profile", ensureAuth, authController.getUserProfile);




// router.get("/:id", ensureAuth, networksController.getDashboard)

// router.get('/network', ensureAuth, homeController.getNetwork)


module.exports = router;


// function ensureAuthModel(req, res, next) {
//     if (isModel(req.user)) { return next(); }
//     res.redirect('/profile')
//   }

//   function ensureAuthStylist(req, res, next) {
//     if (isStylist(req.user)) { return next(); }
//     res.redirect('/profile')
//   }

