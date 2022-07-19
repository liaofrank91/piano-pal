const mongoose = require('mongoose')

// create a repertoireSchema instance every time a new user is registered
const repertoireSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please add a user for this repertoire'],
    },
    songIdArray: {
        type: [String]
    }
})

module.exports = mongoose.model('Repertoire', repertoireSchema)