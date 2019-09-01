const express = require('express');

const router = express.Router();

const userRouter = require('./api/users');
const contactsRouter = require('./api/contacts');
const authRouter = require('./api/auth');

router.use('/users', userRouter);
router.use('/contacts', contactsRouter);
router.use('/auth', authRouter);

module.exports = router;
