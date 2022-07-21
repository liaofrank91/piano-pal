const asyncHandler = require('express-async-handler')

const Repertoire = require('../models/repertoireModel')

// @desc    Create a new (blank) repertoire instance
// @route   /api/repertoire/create
// @access  Public
const createRepertoire = asyncHandler(async (req, res) => {
    const { email } = req.body

    // Check if the user information is present
    if (!email) {
        res.status(400)
        throw new Error("Please include the user")
    }

    // Check if there's already a repertoire for this user
    let alreadyExists = await Repertoire.findOne({ email })
    if (alreadyExists) {
        res.status(400)
        throw new Error("There is already a repertoire for this user")
    }

    const repertoire = await Repertoire.create({ email, songIdArray: [] })

    if (repertoire) {
        res.status(201).json({
            _id: repertoire._id,
            email: repertoire.email,
            songIdArray: repertoire.songIdArray,
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// @desc    Get a user's repertoire
// @route   /api/repertoire/get
// @access  Public
const getRepertoire = asyncHandler(async (req, res) => {
    const email = req.get('email')
    console.log(email, 'got it?')

    // Check if the user information is present
    if (!email) {
        res.status(400)
        throw new Error("Please include the user")
    }

    const repertoire = await Repertoire.findOne({ email })

    if (repertoire) {
        console.log(repertoire)
        res.status(201).json({
            _id: repertoire._id,
            email: repertoire.email,
            songIdArray: repertoire.songIdArray,
        })
    } else {
        res.status(400)
        throw new Error('Something went wrong...??')
    }
})

// @desc    Add to a repertoire
// @route   /api/repertoire/add
// @access  Public
const addToRepertoire = asyncHandler(async (req, res) => {
    const { newSongId, email } = req.body

    if (!newSongId || !email) {
        res.status(400)
        throw new Error("Please include both the newSongId and user's email")
    }

    // Find the right repertoire object
    const repertoire = await Repertoire.findOne({ email })
    console.log(repertoire)
    // Note down what's currently in the repertoire's songIdArray 
    const newSongIdArray = repertoire.songIdArray

    // If the repertoire they're looking for doesn't exist
    if (!repertoire) {
        res.status(400)
        throw new Error("Please double check your email")
    }

    // CHECKING alreadyExists IS REDUNDANT: IF I CREATE A NEW SONG IT WILL GENERATE A NEW ID FOR THE NEW SONG DOCUMENT EVEN IF ALL THE INPUTTED FIELDS ARE EXACTLY THE SAME. Remove when 100% sure not needed for some other functionality
    // ------------------------------------------------------------------------------------------------------------------
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
        res.status(200).json(repertoire)
    }
})

// @desc    Remove from a repertoire
// @route   /api/repertoire/remove
// @access  Public
const removeFromRepertoire = asyncHandler(async (req, res) => {
    const { newSongId, email } = req.body

    if (!newSongId || !email) {
        res.status(400)
        throw new Error("Please include both the newSongId and user's email")
    }

    // Find the right repertoire object
    const repertoire = await Repertoire.findOne({ email })

    // If the repertoire they're looking for doesn't exist
    if (!repertoire) {
        res.status(400)
        throw new Error("Please double check your email")
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
        res.status(200).json(repertoire)
    }
})

module.exports = {
    createRepertoire,
    getRepertoire,
    addToRepertoire,
    removeFromRepertoire
}
