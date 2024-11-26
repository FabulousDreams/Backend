const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../middleware/jwt.middleware.js')
const Dream = require('../models/Dream.model.js')

// Get dream count grouped by emotions
router.get('/analysis/emotions', isAuthenticated, (req, res, next) => {
  Dream.aggregate([
    { $unwind: '$emotions' },
    {
      $group: {
        _id: '$emotions',
        count: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: 'emotions',
        localField: '_id',
        foreignField: '_id',
        as: 'emotionDetails'
      }
    },
    {
      $project: {
        emotion: { $arrayElemAt: ['$emotionDetails.name', 0] },
        count: 1
      }
    }
  ])
    .then(result => res.status(200).json(result))
    .catch(error => next(error))
})

// Get dream count grouped by tags
router.get('/analysis/tags', isAuthenticated, (req, res, next) => {
  Dream.aggregate([
    { $unwind: '$tags' },
    {
      $group: {
        _id: '$tags',
        count: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: 'tags',
        localField: '_id',
        foreignField: '_id',
        as: 'tagDetails'
      }
    },
    {
      $project: {
        tag: { $arrayElemAt: ['$tagDetails.name', 0] },
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
