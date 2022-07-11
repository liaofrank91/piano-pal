const express = require('express')
// ^ common JS module syntax
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 8000

// Connect to database
connectDB()

const app = express()

// middleware that lets us accept json data, urlencoded data in the body
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.status(200).json({message: "Welcome to the Practice Assistant API"})
})

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/songs', require('./routes/songRoutes'))

app.use(errorHandler) // lets us use middleware


// START THE CONNECTION ON A SPECIFIC PORT
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
