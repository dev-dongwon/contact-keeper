const express = require('express');
const { validator } = require('../../middlewares/data-validator');
const userController = require('../../controller/users');

const router = express.Router();

/*
@route      GET api/user
@desc       Register in user
@access     public
*/

router.post('/', validator.user, userController.addUser);

module.exports = router;
