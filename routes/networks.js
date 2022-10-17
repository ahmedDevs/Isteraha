const express = require("express")
const router = express.Router()
const upload = require("../middleware/multer");
const networksController = require("../controllers/networks")
const { ensureAuth, ensureGuest } = require("../middleware/auth")

router.get("/:id", networksController.getNetworks)
router.get("/create", ensureAuth, networksController.getNetworkPage)
router.post("/:id/createNetwork", upload.single("file"), networksController.createNetwork)
router.post('/:id/leave', networksController.postLeaveNetwork)
router.get("/:id/members", ensureAuth, networksController.getMembersPage)
module.exports = router