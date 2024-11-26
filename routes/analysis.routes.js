const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../middleware/jwt.middleware.js')
const Dream = require('../models/Dream.model.js')

// Get dream count grouped by emotions
router.get('/analysis/emotions', isAuthenticated, (req, res, next) => {
  Dream.aggregate([
    { $unwind: '$emotions' },
    {
      $lookup: {
        from: 'emotions', // Matches the `Emotion` model's collection
        localField: 'emotions',
        foreignField: '_id',
        as: 'emotionDetails'
      }
    },
    { $unwind: '$emotionDetails' },
    {
      $group: {
        _id: '$emotionDetails.name', // Group by emotion name
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        emotion: '$_id',
        count: 1
      }
    }
  ])
    .then(result => res.status(200).json(result))
    .catch(err => next(err))
})

// Get dream count grouped by tags
router.get('/analysis/tags', isAuthenticated, (req, res, next) => {
  Dream.aggregate([
    { $unwind: '$tags' },
    {
      $lookup: {
        from: 'tags', // Matches the `Tag` model's collection
        localField: 'tags',
        foreignField: '_id',
        as: 'tagDetails'
      }
    },
    { $unwind: '$tagDetails' },
    {
      $group: {
        _id: '$tagDetails.name', // Group by tag name
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        tag: '$_id',
        count: 1
      }
    }
  ])
    .then(result => res.status(200).json(result))
    .catch(error => next(error))
})

// Get dream trends over time (grouped by month/year)
router.get('/analysis/trends', isAuthenticated, (req, res, next) => {
  Dream.aggregate([
    {
      $group: {
        _id: {
          year: { $year: '$date' },
          month: { $month: '$date' }
        },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { '_id.year': 1, '_id.month': 1 }
    }
  ])
    .then(result => res.status(200).json(result))
    .catch(error => next(error))
})

module.exports = router
