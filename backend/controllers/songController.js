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

// @desc    Remove a song instance
// @route   /api/songs/remove
// @access  Public
const removeSong = asyncHandler(async (req, res) => {
    const songId = req.params.songId

    // Check if all necessary fields are present
    if (!songId) {
        res.status(400)
        throw new Error("Please include the song id!")
    }

    const song = await Song.findById(songId)

    if (!song) {
        res.status(404)
        throw new Error('Song not found!')
    } else {
        await song.remove()
    }
})

// @desc    Get songs by user
// @route   /api/songs/create
// @access  Public
const getSongsByUser = asyncHandler(async (req, res) => {
    const userId = req.get('userId')

    if (!userId) {
        res.status(400)
        throw new Error("Please include the userId")
    }

    const retrievedSongs = await Song.find({ user: userId })

    if (retrievedSongs) {
        res.status(200).json(retrievedSongs)
    } else {
        throw new Error("Something went wrong..???")
    }

})

module.exports = {
    createSong,
    getSongsByUser,
    removeSong,
}
