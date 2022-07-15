const express = require('express')
const router = express.Router()
const { createSong } = require('../controllers/songController')

// const { protect } = require('../middleware/authMiddleware')

router.post('/create', createSong)


module.exports = router