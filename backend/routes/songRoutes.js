const express = require('express')
const router = express.Router()
const { createSong, getSongsByUser, removeSong } = require('../controllers/songController')

// const { protect } = require('../middleware/authMiddleware')

router.post('/create', createSong)
router.get('/getSongsByUser', getSongsByUser)
router.delete('/remove/:songId', removeSong)


module.exports = router