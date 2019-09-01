const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { checkValidation } = require('../middlewares/data-validator');

const User = require('../models/user');

const controller = {
  authUser: async (req, res) => {
    // body data validation check
    checkValidation(req, res);
    const { email, password } = req.body;

    try {
      // check duple user
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: '아이디 또는 비밀번호가 일치하지 않습니다' });
      }

      // check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: '아이디 또는 비밀번호가 일치하지 않습니다' });
      }

      // jwt 토큰 생성 후 response로 반환
      const payload = {
        user: {
          id: user.id
        }
      };

      const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 3600
      });

      res.json({ token });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
};

module.exports = controller;
