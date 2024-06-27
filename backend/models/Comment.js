const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  }
});

module.exports = mongoose.model('Comment', CommentSchema);
