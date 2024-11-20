const express = require('express')
const router = express.Router()
const { isAuthenticated } = require('../middleware/jwt.middleware.js')
const Dreams = require('../models/Dream.model.js')

router.get('/dreams', isAuthenticated, (req, res, next) => {
  Dreams.find()
    .then(AllDreams => {
      res.status(200).json(AllDreams)
    })
    .catch(error => {
      next(error)
    })
})
router.get('/dreams/:id', isAuthenticated, (req, res, next) => {
  Dreams.findById(req.params.id)
    .then(dream => {
      res.status(200).json(dream)
    })
    .catch(error => {
      next(error)
    })
})
router.post('/dreams', isAuthenticated, (req, res, next) => {
  const { title, description, emotions, tags, isPublic, imageUrl } = req.body
  console.log(req.body)
  if (!title || !description) {
    return res
      .status(400)
      .json({ message: 'User ID, title, and description are required.' })
  }

  Dreams.create({
    userId: req.user._id,
    title,
    description,
    emotions,
    tags,
    isPublic,
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
router.put('/dreams/:id', isAuthenticated, (req, res, next) => {
  Dreams.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedDream => {
      res.status(200).json(updatedDream)
    })
    .catch(error => {
      next(error)
    })
})
router.delete('/dreams/:id', isAuthenticated, (req, res, next) => {
  Dreams.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).send()
    })
    .catch(error => {
      next(error)
    })
})
module.exports = router
