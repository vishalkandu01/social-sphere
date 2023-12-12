const router = require("express").Router();
const postsController = require("../controller/postsController");
const requireUser = require("../middlewares/requireUser");

router.get("/all", requireUser, postsController.getAllPostsController);
router.post("/", requireUser, postsController.createPostController);
router.post("/like", requireUser, postsController.likeAndUnlikePost);

module.exports = router;