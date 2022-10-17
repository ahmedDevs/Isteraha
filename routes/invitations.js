const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth")
const homeController = require("../controllers/home")
const postsController = require("../controllers/posts")
const networksController = require("../controllers/networks")
const invitationsController = require("../controllers/invitations")
const { ensureAuth, ensureGuest } = require("../middleware/auth")


// router.get("/dashboard", ensureAuth, invitationsController.getInvitePage)

// router.post("/dashboard", ensureAuth, invitationsController.postInvitePage)
// router.post("/:id/dashboard/inviteUser/:id", ensureAuth, authController.postInviteUser)

router.get("/:id", ensureAuth, invitationsController.getInvitePage)
router.post("/:id", ensureAuth, invitationsController.postInvitePage)

// router.get("/:id/acceptInvitation", ensureAuth, authController.getInvitePage)
router.put("/:id/accept", ensureAuth, invitationsController.postAcceptInvitation)
router.post("/:id/decline", invitationsController.postDeclineInvitation)
module.exports = router