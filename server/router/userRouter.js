const requireUser = require('../middlewares/requireUser');
const UserController = require('../controller/userController');
const router = require('express').Router();

router.post('/follow', requireUser, UserController.followOrUnfollowUser);
router.get('/getPostOfFollowing', requireUser, UserController.getPostOfFollowing)
router.get('/getMyPosts', requireuser, UserController.getMyPosts);
router.get('/getUserPosts', requireuser, UserController.getUserPosts);

module.exports = router;