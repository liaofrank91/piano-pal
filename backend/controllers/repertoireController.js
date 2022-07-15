const asyncHandler = require('express-async-handler')

const Repertoire = require('../models/repertoireModel')

// @desc    Create a new (blank) repertoire instance
// @route   /api/repertoire/create
// @access  Public
const createRepertoire = asyncHandler(async (req, res) => {
    const { user } = req.body

    // Check if the user information is present
    if (!user) {
        res.status(400)
        throw new Error("Please include the user")
    }

    // Check if there's already a repertoire for this user
    let alreadyExists = await Repertoire.findOne({ user })
    if (alreadyExists) {
        res.status(400)
        throw new Error("There is already a repertoire for this user")
    }

    const repertoire = await Repertoire.create({ user, songIdArray: [] })

    if (repertoire) {
        res.status(201).json({
            _id: repertoire._id,
            user: repertoire.user,
            songIdArray: repertoire.songIdArray,
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Add to a repertoire
// @route   /api/repertoire/add
// @access  Public
const addToRepertoire = asyncHandler(async (req, res) => {
    const { newSongId, userId } = req.body

    if (!newSongId || !userId) {
        res.status(400)
        throw new Error("Please include both the newSongId and userId")
    }

    // Find the right repertoire object
    const repertoire = await Repertoire.findOne({ user: userId })
    console.log(repertoire)
    // Note down what's currently in the repertoire's songIdArray 
    const newSongIdArray = repertoire.songIdArray

    // If the repertoire they're looking for doesn't exist
    if (!repertoire) {
        res.status(400)
        throw new Error("Please double check your userId")
    }

    // Check if the songId is already in the songIdArray
    let alreadyExists = false;
    repertoire.songIdArray.forEach((songId) => {
        if (songId === newSongId) {
            alreadyExists = true
        }
    })
    if (alreadyExists) {
        res.status(400)
        throw new Error("This song has already been added to the repertoire")
    } else {
        // then we can add it to newSongIdArray
        newSongIdArray.push(newSongId)
        // Update the songIdArray
        repertoire.songIdArray = newSongIdArray
        await repertoire.save()
        res.status(201).json(repertoire)
    }
})

// @desc    Remove from a repertoire
// @route   /api/repertoire/remove
// @access  Public
const removeFromRepertoire = asyncHandler(async (req, res) => {
    const { newSongId, userId } = req.body

    if (!newSongId || !userId) {
        res.status(400)
        throw new Error("Please include both the newSongId and userId")
    }

    // Find the right repertoire object
    const repertoire = await Repertoire.findOne({ user: userId })

    // If the repertoire they're looking for doesn't exist
    if (!repertoire) {
        res.status(400)
        throw new Error("Please double check your userId")
    }

    // Check if the songId is actually in the songIdArray
    let songExists = false;
    repertoire.songIdArray.forEach((songId) => {
        if (songId === newSongId) {
            songExists = true
        }
    })

    if (!songExists) {
        res.status(400)
        throw new Error('This song does not exist in the repertoire in the first place, so it cannot be deleted')
    } else {
        repertoire.songIdArray = repertoire.songIdArray.filter(song => (song !== newSongId))
        await repertoire.save()
        res.status(201).json(repertoire)
    }
})

module.exports = {
    createRepertoire,
    addToRepertoire,
    removeFromRepertoire
}
