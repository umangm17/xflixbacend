// const { application } = require("express")
const  videoController=require("../controllers/route.controller")
const express=require("express")
const router=express.Router();


router.get("/",videoController.getAllVideos)
router.get("/:videoId",videoController.getVideobyId)
router.post("/",videoController.postVideo)
router.patch("/:videoId/votes",videoController.updateVoteCount)
router.patch("/:videoId/views",videoController.updateViewCount)


module.exports = router;