const express = require('express');
const router = express.Router();

const User = require('../../models/User');
const Event = require('../../models/Event');

// @route   POST api/events/:id
// @desc    Create Event
router.post('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, address, date } = req.body;

  try {
    const event = new Event({
      owner: id,
      name,
      address,
      attending: [id],
      date,
    });

    await event.save();

    res.send(event);
  } catch (error) {
    console.log(error);
  }
});

// @route   GET api/events/:id
// @desc    Get Event
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id).populate('attending');

    res.send(event);
  } catch (error) {
    console.log(error);
  }
});

// @route   GET api/events/:id
// @desc    Get All Events
router.get('/all/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const events = await Event.find({ attending: { $all: [user_id] } });

    res.send(events);
  } catch (error) {
    console.log(error);
  }
});

// @route   POST api/events/:event_id/add_user
// @desc    Add User To Event
router.post('/:event_id/add_user', async (req, res) => {
  const { event_id } = req.params;
  const { email } = req.body;

  try {
    let event = await Event.findById(event_id);

    const user = await User.findOne({ email });

    const check = event.attending.some(
      ({ _id }) => _id.toString() === user._id
    );

    if (check) {
      return res.status(400).send('User is already attending!');
    }

    event.attending.push(user._id);

    await event.save();

    event = await Event.findById(event_id).populate('attending');

    res.send(event);
  } catch (error) {
    console.log(error);
  }
});

// @route   POST api/events/:id/chat/add
// @desc    Add Message To Chat
router.post('/:id/chat/add', async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const event = await Event.findById(id);

    event.chat.push(body);

    await event.save();

    res.send(event.chat[event.chat.length - 1]);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router;
