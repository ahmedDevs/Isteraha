const express = require("express");
const router = express.Router();
const networksController = require("../controllers/networks")
const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get("/network/:id", ensureAuth, networksController.getNetworkSettings)
router.get("/user", ensureAuth, networksController.getUserSettings)
router.post("/network/:id/save", ensureAuth, networksController.postNetworkSettings)
router.post("/user/save", ensureAuth, networksController.postUserSettings)

module.exports = router;