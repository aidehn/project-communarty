const mongoose = require('./db');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
}, {
  collection: 'users',
  _id: false,
  versionKey: false
});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;