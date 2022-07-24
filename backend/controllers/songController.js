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
// @route   /api/songs/remove/:songId
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

// @desc    Get song by songId
// @route   /api/songs/get/:songId
// @access  Public
const getSong = asyncHandler(async (req, res) => {
    const songId = req.params.songId

    if (!songId) {
        res.status(400)
        throw new Error("Please include the songId")
    }

    const song = await Song.findOne({ _id: songId })

    if (song) {
        res.status(200).json(song)
    } else {
        throw new Error("Something went wrong with getting the song")
    }
})

// @desc    Update a song's practiceTime array when the user HASN'T already practiced today
// @route   /api/songs/update/newPractice
// @access  Public
const newPractice = asyncHandler(async (req, res) => {
    const { songId, minsToAdd } = req.body
    
    if (!songId) {
        res.status(400)
        throw new Error("Please include the songId")
    }

    const song = await Song.findOne({ _id: songId})

    if (!song) {
        res.status(400)
        throw new Error('something went wrong')
    } else {
        song.practiceTime.unshift(
            {
                date: new Date().toLocaleDateString('en-CA'),
                timeAchieved: minsToAdd 
            }
        )
        await song.save()
        res.status(200).json(song)
    }

})


// @desc    Update a song's practiceTime array when the user HAS already practiced today
// @route   /api/songs/update/existingPractice
// @access  Public
const existingPractice = asyncHandler(async (req, res) => {
    const { songId, minsToAdd, index } = req.body

    if (!songId) {
        res.status(400)
        throw new Error("Please include the songId")
    }

    const song = await Song.findOne({ _id: songId })

    if (!song) {
        res.status(400)
        throw new Error('something went wrong')
    } else {
        song.practiceTime[index].timeAchieved += minsToAdd
        await song.save()
        res.status(200).json(song)
    }
})


module.exports = {
        createSong,
        getSongsByUser,
        removeSong,
        getSong,
        newPractice,
        existingPractice
    }
