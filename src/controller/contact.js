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
  },

  updateContact: async (req, res) => {
    const {
      name, email, phone, type
    } = req.body;

    const contactFields = {};

    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;

    try {
      let contact = await Contact.findById(req.params.id);
      if (!contact) {
        return res.status(404).json({ msg: 'Contact Not Found' });
      }

      if (contact.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not Authorized' });
      }

      contact = await Contact.findByIdAndUpdate(
        req.params.id,
        { $set: contactFields },
        { new: true }
      );

      res.json(contact);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  },
  deleteContact: async (req, res) => {
    try {
      const contact = await Contact.findById(req.params.id);
      if (!contact) {
        return res.status(404).json({ msg: 'Contact Not Found' });
      }

      if (contact.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not Authorized' });
      }

      await Contact.findByIdAndRemove(req.params.id);

      res.json({ msg: 'Contact removed' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
};

module.exports = controller;
