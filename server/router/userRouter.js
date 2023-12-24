const router = require('express').Router();
const requireUser = require('../middlewares/requireUser');
const UserController = require('../controller/userController');

router.post('/follow', requireUser, UserController.followOrUnfollowUserController);
router.get('/getPostOfFollowing', requireUser, UserController.getPostOfFollowing)
router.get('/getMyPosts', requireUser, UserController.getMyPosts);
router.get('/getUserPosts', requireUser, UserController.getUserPosts);
router.delete('/', requireUser, UserController.deleteMyProfile);
router.get('/getMyInfo', requireUser, UserController.getMyInfo);

router.put('/', requireUser, UserController.updateUserProfile);
router.post('/getUserProfile', requireUser, UserController.getUserProfile);

module.exports = router;