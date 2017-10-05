const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
  slug: {type: String},
  title: {type: String, required: true},
  question: {type: String, required: true},
  author: String,
  answers: [{type: Schema.Types.ObjectId, ref: "Answer"}],
  voteup: [{type: Schema.Types.ObjectId, ref: "User"}],
  votedown: [{type: Schema.Types.ObjectId, ref: "User"}]
}, {
  timestamps: true
})

const Question = mongoose.model('Question', questionSchema)

module.exports = Question
