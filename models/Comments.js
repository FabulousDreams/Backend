const { Schema, model } = require('mongoose')
const comments = {
  dreamId,
  userId,
  text,
  date
}

const CommentsSchema = new Schema({
  dreamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dream',
    required: true
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now }
})
