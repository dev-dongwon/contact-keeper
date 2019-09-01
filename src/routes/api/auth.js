const express = require('express');
const { validator } = require('../../middlewares/data-validator');
const authUser = require('../../middlewares/auth-user');
const authController = require('../../controller/auth');

const router = express.Router();

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get('/', authUser, authController.getUser);

// @route     POST api/auth
// @desc      Auth user & get token
// @access    Public
router.post('/', validator.auth, authController.authUser);

module.exports = router;
