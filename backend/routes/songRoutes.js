const express = require('express')
const router = express.Router()
const { createSong, getSongsByUser, removeSong, getSong, newPractice, existingPractice, updatePracticeTimeGoal } = require('../controllers/songController')

// const { protect } = require('../middleware/authMiddleware')

router.post('/create', createSong)
router.get('/getSongsByUser', getSongsByUser)
router.delete('/remove/:songId', removeSong)
router.get('/get/:songId', getSong)
router.put('/update/newPractice', newPractice)
router.put('/update/existingPractice', existingPractice)
router.put('/update/practiceTimeGoal', updatePracticeTimeGoal)


module.exports = router