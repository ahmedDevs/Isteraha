const express = require("express")
const router = express.Router()
const upload = require("../middleware/multer");
const notificationsController = require("../controllers/notifications")
const { ensureAuth, ensureGuest } = require("../middleware/auth")


router.get("/", ensureAuth, notificationsController.getNotifications);

module.exports = router;