const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    development: {
        type: Number,
        required: true
    },
    graphics: {
        type: Number,
        required: true
    },
    ai: {
        type: Number,
        required: true
    },
    gameDesign: {
        type: Number,
        required: true
    },
    sound: {
        type: Number,
        required: true
    },
    overallRating: {
        type: Number,
        required: true
    },
    potential: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Employee', EmployeeSchema);
