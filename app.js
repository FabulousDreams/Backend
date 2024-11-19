require('dotenv').config()
require('./db')
const express = require('express')

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express

const app = express()

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app)

// 👇 Start handling routes here
const indexRoutes = require('./routes/index.routes')
app.use('/api', indexRoutes)

const authRoutes = require('./routes/auth.routes')
app.use('/auth', authRoutes)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app)

module.exports = app
