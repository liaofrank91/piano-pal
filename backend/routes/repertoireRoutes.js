const express = require('express')
const router = express.Router()
const { createRepertoire, addToRepertoire, removeFromRepertoire } = require('../controllers/repertoireController')

// const { protect } = require('../middleware/authMiddleware')

// REMEMBER TO PROTECT ADDTOREPERTOIRE AND REMOVEFROMREPERTOIRE - SHOULD NOT BE ABLE TO DO SO IF IT IS NOT YOUR REPERTOIRE

router.post('/create', createRepertoire)
router.put('/add', addToRepertoire)
router.delete('/remove', removeFromRepertoire)



module.exports = router