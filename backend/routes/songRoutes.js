const express = require('express')
const router = express.Router()
const { createSong, getSongsByUser, removeSong, getSong } = require('../controllers/songController')

// const { protect } = require('../middleware/authMiddleware')

router.post('/create', createSong)
router.get('/getSongsByUser', getSongsByUser)
router.delete('/remove/:songId', removeSong)
router.get('/get/:songId', getSong)


module.exports = router