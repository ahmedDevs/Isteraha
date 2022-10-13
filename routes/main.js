const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth")
const homeController = require("../controllers/home")
const postsController = require("../controllers/posts")
const networksController = require("../controllers/networks")
// const networksController = require("../controllers/networks")
const { ensureAuth, ensureGuest } = require("../middleware/auth")


router.get("/", homeController.getIndex)
router.get("/:id/profile", ensureAuth, postsController.getProfile)
router.get("/feed", ensureAuth, postsController.getFeed)
router.get("/login", authController.getLogin)
router.post("/login", authController.postLogin)
router.get("/logout", authController.logout)
router.get("/signup", authController.getSignup)
router.post("/signup", authController.postSignup)

// router.get("/:id/notifications", ensureAuth, authController.getNotifications)
// router.get("/:id/profile", ensureAuth, authController.getUserProfile)

router.get("/:id/dashboard", ensureAuth, authController.getDashboard)
router.get("/:id/feed", ensureAuth, authController.getNetworkFeed)
router.post("/:id/follow", ensureAuth, authController.postFollow)
router.post("/:id/unfollow", ensureAuth, authController.postUnfollow)
router.post("/:id/searchUsernames", authController.postSearchUsernames)




module.exports = router



