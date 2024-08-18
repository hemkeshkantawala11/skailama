const router = require('express').Router();
const signupController = require('../Controllers/signupController');


router.post('/', signupController.createUser);
router.post('/google', signupController.googleSignup);

module.exports = router;
