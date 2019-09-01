const Contact = require('../models/contact');

const controller = {
  getContacts: async (req, res) => {
    try {
      const contacts = await Contact.find({ user: req.user.id });
      res.json(contacts);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
};

module.exports = controller;
