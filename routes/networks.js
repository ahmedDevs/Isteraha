const express = require("express")
const router = express.Router()
const upload = require("../middleware/multer");
const networksController = require("../controllers/networks")
const { ensureAuth, ensureGuest } = require("../middleware/auth")

//Post Routes - simplified for now

// router.get("/", ensureAuth, networksController.getNetworkPage)


router.get("/", ensureAuth, networksController.getNetworkPage)




// router.get("/:id", ensureAuth, networksController.getDashboard)

// router.get("/:id", networksController.getNetworkFeed)


router.post("/createNetwork", upload.single("file"), networksController.createNetwork)

// router.post("/createNetwork/:id", networksController.createNetwork)

// router.put("/likePost/:id", postsController.likePost)

// router.delete("/deletePost/:id", postsController.deletePost)






module.exports = router