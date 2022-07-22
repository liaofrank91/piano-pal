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
    console.log(response.data)
    return response.data
}

const songService = {
    getSongsByUser, 
    removeSong,
    getSong
}

export default songService