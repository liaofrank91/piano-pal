const express = require('express')
const router = express.Router()
const { createSong } = require('../controllers/songController')

// const { protect } = require('../middleware/authMiddleware')

router.post('/create', createSong)
// router.post('/login', loginUser)
// router.get('/me', protect, getMe)



module.exports = router