const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register User
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).send('User with this email already exists!');
    }

    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    delete user.password;

    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

// @route   GET api/users/:id
// @desc    Get User
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).populate({
      path: 'friends',
      select: 'name tests',
    });

    delete user.password;

    res.send(user);
  } catch (error) {
    console.log(error);
  }
});

// @route   POST api/users/log/:id
// @desc    Log Test
router.post('/log/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    user.tests.unshift(req.body);

    await user.save();

    res.send(user.tests);
  } catch (error) {
    console.log(error);
  }
});

// @route   POST api/users/notifications
// @desc    Add Notification
// router.post('/notifications', async (req, res) => {
//   const { email, notification } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     user.notifications.unshift(notification);

//     await user.save();

//     res.send(user.notifications);
//   } catch (error) {
//     console.log(error);
//   }
// });

// @route   DELETE api/users/notifications/:id
// @desc    Remove Notification
// router.delete('/notifications/:id', async (req, res) => {
//   const { email } = req.body;
//   const { id } = req.params;

//   try {
//     const user = await User.findOne({ email });

//     user.notifications = user.notifications.filter(
//       ({ _id }) => _id.toString() !== id
//     );

//     await user.save();

//     res.send(user.notifications);
//   } catch (error) {
//     console.log(error);
//   }
// });

// @route   POST api/users/friends/:user_id/:friend_id
// @desc    Add Friend
router.post('/friends/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const { email } = req.body;
  try {
    const user = await User.findById(user_id);
    const friend = await User.findOne({ email });

    const check = user.friends.some(({ _id }) => _id.toString() === friend._id);

    if (check) {
      return res
        .status(400)
        .send('This person is already in your friends list!');
    }

    user.friends.push(friend._id);

    friend.friends.push(user_id);

    await user.save();

    await friend.save();

    const updatedUser = await User.findById(user_id).populate({
      path: 'friends',
      select: 'name tests',
    });

    res.send(updatedUser.friends);
  } catch (error) {
    console.log(error);
  }
});

// // @route   GET api/users/friends/:id
// // @desc    Get All Friends
// router.get('/friends/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     const user = await User.findById(id).populate('friends');

//     res.send(user.friends);
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;
