const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skills: {
    programming: { type: Number, min: 1, max: 100 },
    design: { type: Number, min: 1, max: 100 },
    marketing: { type: Number, min: 1, max: 100 }
  },
  salary: { type: Number, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
});

module.exports = mongoose.model('Employee', employeeSchema);
