const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tests: [
    {
      status: { type: String, required: true },
      location: { type: String },
      date: { type: String, required: true },
    },
  ],
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  // notifications: [
  //   {
  //     sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  //     sender: { type: String },
  //     type: { type: String },
  //     msg: { type: String },
  //   },
  // ],
});

module.exports = mongoose.model('User', UserSchema);
