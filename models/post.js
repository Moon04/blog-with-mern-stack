const mongoose = require('mongoose');

const Post_schema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
    text: true
  },
  body: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
  },
  tags: {
      type: [ String ],
      required: false,
      text: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

const Post = mongoose.model('Post', Post_schema);
module.exports = Post;

mongoose.set('useCreateIndex', true);
