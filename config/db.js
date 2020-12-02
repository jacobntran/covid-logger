const mongoose = require('mongoose');
const config = require('config');
const db = process.env.MONGODB_URI || config.get('mongoURI');

module.exports = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log('MongoDB Connected...');
  } catch (error) {
    console.log(error);
  }
};
