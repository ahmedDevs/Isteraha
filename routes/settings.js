const express = require("express");
const router = express.Router();
const networksController = require("../controllers/networks")
const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get("/network", ensureAuth, networksController.getNetworkSettings)
router.get("/user", ensureAuth, networksController.getUserSettings)
router.post("/network/save", ensureAuth, networksController.postNetworkSettings)
router.post("/user/save", ensureAuth, networksController.postUserSettings)

module.exports = router;