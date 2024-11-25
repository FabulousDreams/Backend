const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/jwt.middleware');
const Dream = require('../models/Dream.model');

// endpoint to get aggregated data

router.get('/dreams/analytics', isAuthenticated, async (req, res, next) => {
    try {
        const userId = req.user._id;

        // Count dreams by emotion

        const emotionsCounts = await Dream.aggregate([
            { $match: { userId } },
            { $unwind: '$emotions' },
            { $group: { _id: '$emotions', count: { $sum: 1 } } },
        ]);

        // count dreams by tag

        const tagCounts = await Dream.aggregate([
            { $match: { userId } },
            { $unwind: '$tags' },
            { $group: { _id: '$tags', count: { $sum: 1 } } }
        ]);

        // count public x private dreams

        const publicPrivateCounts = await Dream.aggregate([
            { $match: { userId } },
            { $group: { _id: '$isPublic', count: { $sum: 1 } } }
        ]);

        // count dreams over time periods

        const dreamsOverTime = await Dream.aggregate([
            { $match: { userId } },
            {
              $group: {
                _id: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
                count: { $sum: 1 }
              }
            },
            { $sort: { _id: 1 } }
          ]);

          res.status(200).json({
            emotionsCounts,
            tagCounts,
            publicPrivateCounts,
            dreamsOverTime
          });
    } catch (error) {
        next(error);
    }
});

module.exports = router;