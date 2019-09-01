const express = require('express');
const authUser = require('../../middlewares/auth-user');
const { validator } = require('../../middlewares/data-validator');

const contactController = require('../../controller/contact');

const router = express.Router();

// @route     GET api/contacts
// @desc      Get all users contacts
// @access    Private
router.get('/', authUser, contactController.getContacts);

// @route     POST api/contacts
// @desc      Add new contact
// @access    Private
router.post('/', [authUser, validator.contact]);

// @route     PUT api/contacts/:id
// @desc      Update contact
// @access    Private
router.put('/:id', (req, res) => {
  res.send('Update contact');
});

// @route     DELETE api/contacts/:id
// @desc      Delete contact
// @access    Private
router.delete('/:id', (req, res) => {
  res.send('Delete contact');
});

module.exports = router;
