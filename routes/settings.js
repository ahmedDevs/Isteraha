const express = require("express");
const router = express.Router();
const networksController = require("../controllers/networks")
const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get("/network/:id", ensureAuth, networksController.getNetworkSettings)
// router.put("/user", ensureAuth, networksController.putUserSettings)
router.post("/network/:id/save", ensureAuth, networksController.postNetworkSettings)
router.put("/user/save", ensureAuth, networksController.putUserSettings)

module.exports = router;