const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const connection = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/communarty');
    console.log('Successfully connected to the database🎉');
  } catch (err) {
    console.log(err);
    return err
  }
}

connection();

module.exports = mongoose;