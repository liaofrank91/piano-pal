import axios from 'axios'

const API_URL = '/api/repertoire/'

// Create repertoire: this is handled in authService's register function 
// -> the only time we need to create repertoire is when the user is registered  

// Add to repertoire
const addToRepertoire = async (userData) => {
    // const response = await axios.post(API_URL, userData)

    // if (response.data) {
    //     // Create a repertoire for the user when they register for the first time
    //     await axios.post('/api/repertoire/create', userData)

    //     localStorage.setItem('user', JSON.stringify(response.data))        
    // }
    // return response.data
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