const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  funds: { type: Number, default: 10000 },
  reputation: { type: Number, default: 0 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }]
});

module.exports = mongoose.model('Company', companySchema);
