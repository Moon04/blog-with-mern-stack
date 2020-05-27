const mongoose = require('mongoose');

const User_schema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  avatar: {
    type: String,
    required: true
  },
  followers: {
    type: [ mongoose.Schema.Types.ObjectId ],
    ref: 'User'
  },
  followings: {
    type: [ mongoose.Schema.Types.ObjectId ],
    ref: 'User'
  }
});

const User = mongoose.model('User', User_schema);
module.exports = User;

mongoose.set('useCreateIndex', true);
