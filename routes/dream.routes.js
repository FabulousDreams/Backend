const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../middleware/jwt.middleware.js')
const Dream = require('../models/Dream.model.js')

router.post('/dreams', isAuthenticated, (req, res, next) => {
  const { title, description, emotions, tags, isPublic, imageUrl } = req.body
  console.log(req.body)
  if (!title || !description) {
    return res
      .status(400)
      .json({ message: 'User ID, title, and description are required.' })
  }

  Dream.create({
    userId: req.user._id, // Populated by isAuthenticated middleware
    title, // Extracted from req.body
    description, // Extracted from req.body
    emotions, // Extracted from req.body (optional)
    tags, // Extracted from req.body (optional)
    isPublic, // Extracted from req.body (optional)
    imageUrl
  })
    .then(newDream => {
      res
        .status(201)
        .json({ message: 'Dream created successfully!', dream: newDream })
    })
    .catch(error => {
      console.error('Error in dream creation route:', error.message)
      next(error)
    })
})

module.exports = router
