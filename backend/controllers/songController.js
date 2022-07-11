const asyncHandler = require('express-async-handler')

const Song = require('../models/songModel')

// @desc    Create a new song instance
// @route   /api/songs/create
// @access  Public
const createSong = asyncHandler(async (req, res) => {
    const { user, title, composer, notes, practiceTime, practiceTimeGoal } = req.body

    // Check if all necessary fields are present
    if (!user || !title || !composer || !practiceTimeGoal) {
        res.status(400)
        throw new Error("Please include all fields")
    }

    const song = await Song.create({
        user,
        title,
        composer,
        notes,
        practiceTime,
        practiceTimeGoal
    })

    if (song) {
        res.status(201).json({
            _id: song._id,
            user: song.user,
            title: song.title,
            composer: song.composer,
            notes: song.notes,
            practiceTime: song.practiceTime,
            practiceTimeGoal: song.practiceTimeGoal,
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

module.exports = {
    createSong,
}
