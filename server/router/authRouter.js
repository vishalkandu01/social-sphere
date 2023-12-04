const router = require('express').Router();
// const {signupController, loginController} = require('../controller/authController');
const authController = require('../controller/authController');

// router.post('/signup', signupController);
// router.post('/login', loginController);
router.post('/signup', authController.signupController);
router.post('/login', authController.loginController);

module.exports = router;