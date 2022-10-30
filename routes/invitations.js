const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth")
const homeController = require("../controllers/home")
const postsController = require("../controllers/posts")
const networksController = require("../controllers/networks")
const invitationsController = require("../controllers/invitations")
const { ensureAuth, ensureGuest } = require("../middleware/auth")



router.get("/:id", ensureAuth, invitationsController.getInvitePage)
router.post("/:id", ensureAuth, invitationsController.postInvitePage)

// router.get("/:id/acceptInvitation", ensureAuth, authController.getInvitePage)
router.put("/:id/accept", ensureAuth, invitationsController.postAcceptInvitation)
router.post("/:id/decline", invitationsController.postDeclineInvitation)
module.exports = router