const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Dream = require('../models/Dream')
const { isAuthenticated } = require('../middleware/jwt.middleware')
const { isAdmin } = require('../middleware/role.middleware')

router.get('/admin/users', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const users = await User.find({}, '-password')
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error })
  }
})

// Delete a user (for super-admin)
router.delete('/users/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { id } = req.params
    const deletedUser = await User.findByIdAndDelete(id)

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error })
  }
})

// List all public dreams
router.get('/dreams', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const publicDreams = await Dream.find({ isPublic: true })
    res.status(200).json(publicDreams)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching public dreams', error })
  }
})

module.exports = router
