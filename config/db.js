const mongoose = require('mongoose');
const config = require('config');

module.exports = async () => {
  try {
    await mongoose.connect(config.get('mongoURI') || process.env.mongoURI, {
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
