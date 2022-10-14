const express = require("express")
const router = express.Router()
const upload = require("../middleware/multer");
const networksController = require("../controllers/networks")
const { ensureAuth, ensureGuest } = require("../middleware/auth")

router.get("/:id", networksController.getNetworks)
router.get("/:id/create", ensureAuth, networksController.getNetworkPage)
router.post("/:id/createNetwork", upload.single("file"), networksController.createNetwork)

module.exports = router