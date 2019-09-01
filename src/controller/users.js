const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { checkValidation } = require('../middlewares/data-validator');

const User = require('../models/user');

const controller = {
  addUser: async (req, res) => {
    // body data validation check
    checkValidation(req, res);
    const { name, email, password } = req.body;

    try {
      // check duple user
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: '동일한 이메일이 존재합니다' });
      }

      user = new User({
        name,
        email,
        password
      });

      // password 암호화
      const salt = await bcrypt.genSalt(Number(process.env.GEN_SALT_NUMBER));
      user.password = await bcrypt.hash(password, salt);

      await user.save();

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
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
};

module.exports = controller;
