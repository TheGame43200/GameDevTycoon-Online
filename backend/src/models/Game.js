const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  developmentStage: { type: String, enum: ['concept', 'development', 'testing', 'release'], default: 'concept' },
  rating: { type: Number, min: 0, max: 10 },
  sales: { type: Number, default: 0 }
});

module.exports = mongoose.model('Game', gameSchema);
