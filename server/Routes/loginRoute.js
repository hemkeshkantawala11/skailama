const router = require('express').Router();
const User = require('../Models/users');
const loginController = require('../Controllers/loginController');

router.post('/', loginController.getUser);

module.exports = router;
