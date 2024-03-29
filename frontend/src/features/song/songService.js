import axios from 'axios'

const SONGS_API_URL = '/api/songs/'

// Create song
// This is handled in repertoireService.addToRepertoire

// Get all songs by user
const getSongsByUser = async (userId) => {
    const response = await axios.get(SONGS_API_URL + 'getSongsByUser', {
        headers: {
            userId
        }
    })
    return response.data
}

// Remove a song
const removeSong = async (songId) => {
    await axios.delete(SONGS_API_URL + 'remove/' + songId)
}

// Get a specific song
const getSong = async (songId) => {
    const response = await axios.get(SONGS_API_URL + 'get/' + songId)
    return response.data
}

// Update a song's practiceTime array when the user HASN'T already practiced today
const newPractice = async (songId, minsToAdd) => {
    const response = await axios.put(SONGS_API_URL + 'update/newPractice', {
        songId,
        minsToAdd
    })
    return response.data
}


// Update a song's practiceTime array when the user HAS already practiced today
const existingPractice = async (songId, minsToAdd, index) => {
    const response = await axios.put(SONGS_API_URL + 'update/existingPractice', {
        songId,
        minsToAdd,
        index
    })
    return response.data
}

// Update a song's practiceTimeGoal
const updatePracticeTimeGoal = async (songId, newGoal) => {
    const response = await axios.put(SONGS_API_URL + 'update/practiceTimeGoal', {
        songId,
        newGoal
    })
    return response.data
}

const addNote = async (songId, note) => {
    const response = await axios.put(SONGS_API_URL + 'addNote', {
        songId,
        note
    })
    return response.data
}

const deleteNote = async (songId, noteId) => {
    const response = await axios.put(SONGS_API_URL + 'deleteNote', {
        songId,
        noteId
    })
    return response.data
}

const songService = {
    getSongsByUser, 
    removeSong,
    getSong,
    newPractice,
    existingPractice,
    updatePracticeTimeGoal,
    addNote,
    deleteNote
}

export default songService