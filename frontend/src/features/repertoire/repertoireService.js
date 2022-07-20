import axios from 'axios'

const REPERTOIRE_API_URL = '/api/repertoire/'

// Create repertoire
// this is handled in authService's register function 
// -> the only time we need to create repertoire is when the user is registered  

// Add to repertoire
const addToRepertoire = async (songData) => {
    // Create a the song object first in the DB
    const songResponse = await axios.post('/api/songs/create', songData)
    // Add the song to the user's repertoire using songId and email
    const addToRepertoireInfo = {
        newSongId: songResponse.data._id,
        email: songData.email
    }
    console.log(songResponse._id, songData.email)
    const response = await axios.put(REPERTOIRE_API_URL + 'add', addToRepertoireInfo)
    return response.data
}

// Remove from repertoire
const removeFromRepertoire = async (userData) => {
    // const response = await axios.post(API_URL, userData)

    // if (response.data) {
    //     // Create a repertoire for the user when they register for the first time
    //     await axios.post('/api/repertoire/create', userData)

    //     localStorage.setItem('user', JSON.stringify(response.data))        
    // }
    // return response.data
}

const repertoireService = {
    addToRepertoire,
    removeFromRepertoire,
}

export default repertoireService