const requireUser = require('../middlewares/requireUser');
const UserController = require('../controllers/userController');
const router = require('express').Router();

router.post('/follow', requireUser, UserController.followOrUnfollowUser);
router.get('/getPostOfFollowing', requireUser, UserController.getPostOfFollowing)

module.exports = router;