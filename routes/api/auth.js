const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../../models/User');

// @route   POST api/auth
// @desc    Login
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).populate('friends');

    if (!user) {
      return res.status(400).send('No user found with this email!');
    }

    const verify = await bcrypt.compare(password, user.password);

    if (!verify) {
      return res.status(400).send('Password Incorrect!');
    }

    delete user.password;

    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
