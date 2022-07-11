const mongoose = require('mongoose')

const songSchema = mongoose.Schema({
    user: { // should the USER ID, not the USER NAME (so we can easily tie the song to the user)
        type: String,
        required: [true, 'Please add the user for this piece']
    },
    title: {
        type: String,
        required: [true, 'Please add the title of the piece']
    },
    composer: {
        type: String,
        required: [true, 'Please add the composer/artist']
    },
    notes: {
        type: [{ date: Date, miscNotes: String, bars: String }],
    },
    practiceTime: {
        type: [{date: Date, timeAchieved: Number}],
    },
    practiceTimeGoal: {
        type: Number,
        required: [true, 'Please include the practice time goal']
    }, 
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Song', songSchema)