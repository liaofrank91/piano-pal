const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe } = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
// ^ i guess we're kinda "chaining" middleware? if protect checks authorization and it's all good, then we move onto getMe. If not, it throws an Error and we go to the error Handler


module.exports = router