const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../middleware/jwt.middleware.js')
const Emotion = require('../models/Emotion.model.js')

// Get all emotions for logged in user

router.get('/emotions', isAuthenticated, (req, res, next) => {
    Emotion.find({ userId: req.user._id })
        .populate('dreamId', 'title')
        .then(allEmotions => {
            res.status(200).json(allEmotions);
        })
        .catch(error => {
            next(error);
        });
});

// get a single emotion by ID

router.get('/emotions/:id', isAuthenticated, (req, res, next) => {
    Emotion.findById(req.params._id)
        .populate('dreamId', 'title') // populate related dream title
        .populate('userId', 'username') // populate user's username
        .then(emotion => {
            if (!emotion) {
                return res.status(404).json({ error: 'Emotion not found' });
            }
            res.status(200).json(emotion);
        })
        .catch(error => {
            next(error);
        });
});

// create new emotion entry for a dream

router.post('/emotions', isAuthenticated, (req, res, next) => {
    
    Emotion.create({
        userId: req.user._id,
        dreamId: req.body.dreamId,
        emotions: req.body.emotions,
        detail: req.body.detail || [],
        color: req.body.color || [],
    })
        .then(newEmotion => {
            res.status(201).json(newEmotion);
        })
        .catch(error => {
            next(error);
        });
});

// update an existing emotion by id

router.put('/emotions/:id', isAuthenticated, (req, res, next) => {
    Emotion.findById(req.params._id)
        .then(emotion => {
            if (!emotion) {
                return res.status(404).json({ error: 'Emotion not found' });
            }
            if (emotion.userId.toString() !== req.user._id) {
                return res.status(403).json({ error: 'Not authorized to update this emotion' })
            }

            emotion.emotions = req.body.emotions || emotion.emotions;
            emotion.detail = req.body.detail || emotion.detail;
            emotion.color = req.body.color || emotion.color;

            return emotion.save();
        })
        .then(updatedEmotion => {
            res.status(200).json(updatedEmotion);
        })
        .catch(error => {
            next(error);
        });
});

// Delete an emotion by ID
router.delete('/emotions/:id', isAuthenticated, (req, res, next) => {
    Emotion.findById(req.params._id)
        .then(emotion => {
            if (!emotion) {
                return res.status(404).json({ error: 'Emotion not found' });
            }
            if (emotion.userId.toString() !== req.user._id) {
                return res.status(403).json({ error: 'Not authorized to delete this emotion' });
            }

            return emotion.deleteOne();
        })
        .then(() => {
            res.status(204).send();
        })
        .catch(error => {
            next(error);
        });
});

module.exports = router;