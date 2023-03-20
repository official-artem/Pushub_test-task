const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  isMultiple: {
    type: Boolean,
    required: true
  },
  options: [String],
  answer: [String],
})

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;