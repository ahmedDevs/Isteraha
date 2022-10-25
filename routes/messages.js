const express = require("express")
const router = express.Router()
const messagesController = require("../controllers/messages")
const { ensureAuth, ensureGuest } = require("../middleware/auth")

router.get("/:id", ensureAuth, messagesController.getMessageUser)
router.post("/:id", ensureAuth, messagesController.postMessageUser)
router.get("/", ensureAuth, messagesController.getMessagePage)

module.exports = router