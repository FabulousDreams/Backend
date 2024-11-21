const { Schema, model } = require('mongoose')

const emotionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  dreamId: {
    type: Schema.Types.ObjectId,
    ref: 'Dream',
    
  },

  emotions: [
    {
      name: String,
      intensity: Number
    }
  ], // Intensity score for each emotion
  date: {
    type: Date,
    default: Date.now
  },
  detail: [{ type: String }],
  color: [String]
})

const Emotion = model('Emotion', emotionSchema)

module.exports = Emotion
