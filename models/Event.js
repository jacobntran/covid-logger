const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  owner: {
    type: { type: mongoose.SchemaTypes.ObjectId, ref: 'User' },
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  date: {
    type: String,
  },
  attending: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'User' }],
  chat: [
    {
      authorId: String,
      authorName: String,
      text: String,
      date: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('Event', EventSchema);
