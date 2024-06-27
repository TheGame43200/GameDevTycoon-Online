const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  developer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Game', GameSchema);
