const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../middleware/jwt.middleware.js')

const Emotion = require('../models/Emotion.model.js')
const Tag = require('../models/Tag.model.js')

// Get all available emotions
router.get('/emotions', (req, res, next) => {
  Emotion.find()
    .then(emotions => {
      res.status(200).json(emotions)

      console.log(res)
    })
    .catch(error => next(error))
})

// Get all available tags
router.get('/tags', (req, res, next) => {
  Tag.find()
    .then(tags => res.status(200).json(tags))
    .catch(error => next(error))
})

module.exports = router
