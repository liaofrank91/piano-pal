const express = require('express')
const router = express.Router()
const { createRepertoire, getRepertoire, addToRepertoire, removeFromRepertoire } = require('../controllers/repertoireController')

// const { protect } = require('../middleware/authMiddleware')
// ^ remember - all that protect does is check if you have a jwt, doesn't compare jwt with anything


router.post('/create', createRepertoire)
router.get('/get', getRepertoire)
router.put('/add', addToRepertoire)
router.delete('/remove', removeFromRepertoire)




module.exports = router