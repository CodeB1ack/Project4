const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
text: String,
category: String,
createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Question', questionSchema);