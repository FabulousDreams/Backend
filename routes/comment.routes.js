const express = require('express');
const router = express.Router();
const Comments = require('../models/Comment.model.js')
const { isAuthenticated } = require('../middleware/jwt.middleware.js')

// GET all comments for a specific dream

router.get('/comments/dream/:dreamId', isAuthenticated, (req, res, next) => {
    Comments.find({ dreamId: req.params.dreamId })
        .populate('userId', 'username')
        .then(comments => {
            res.status(200).json(comments);
        })
        .catch(error => {
            next(error);
        });
});

// Create a new comment

router.post('/comments', isAuthenticated, (req, res, next) => {
    Comments.create({
        dreamId: req.body.dreamId,
        userId: req.user.id,
        text: req.body.text,
        date: new Date()
    })
    .then(newComment => {
        res.status(201).json(newComment);
    })
    .catch(error => {
        next(error);
    });
});

// update a comment by ID

router.put('/comments/:id', isAuthenticated, (re, res, next) => {
    Comments.findById(req.params.id)
        .then(comment => {
            if(!comment) {
                return res.status(404).json({ error: 'Not authorized to update this comment' })
            }

            comment.text = req.body.text || comment.text;
            return comment.save();
        })
        .then(updatedComment => {
            res.status(200).json(updatedComment);
        })
        .catch(error => {
            next(error);
        });
});

// delete a comment by ID

router.delete('/comments/:id', isAuthenticated, (req, res, next) => {
    Comments.findById(req.params.id)
        .then(comment => {
            if(!comment)  {
                return res.status(404).json({ error: 'Comment not found' });
            }
            if(comment.userId.toString() !== req.user.id) {
                return res.status(403).json({ error: 'Not authorized to delete this comment' })
            }
            return comment.deleteOne();
        })
        .then(() => {
            res.status(204).send();
        })
        .catch(error => {
            next(error);
        });
});

module.exports = router;