const Contact = require('../models/contact');
const { checkValidation } = require('../middlewares/data-validator');

const controller = {
  getContacts: async (req, res) => {
    try {
      const contacts = await Contact.find({ user: req.user.id });
      res.json(contacts);
    } catch (error) {
      console.error(error.message);
    }
  },
  addContact: async (req, res) => {
    // validation 체크
    checkValidation(req, res);

    const {
      name, email, phone, type
    } = req.body;

    try {
      // 연락처 생성 후 db save
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });

      const contact = await newContact.save();
      res.json(contact);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
};

module.exports = controller;
