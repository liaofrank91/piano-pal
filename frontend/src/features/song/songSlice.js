import { create } from '@mui/material/styles/createTransitions'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import songService from './songService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    songList: null,
    specificSong: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Get all songs by userId
export const getSongsByUser = createAsyncThunk('songs/getSongsByUser', async (userId, thunkAPI) => {
    try {
        return await songService.getSongsByUser(userId)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// Remove a song
export const removeSong = createAsyncThunk('songs/removeSong', async (songId, thunkAPI) => {
    try {
        await songService.removeSong(songId)
    } catch (error) {
        thunkAPI.rejectWithValue('The song could not be found')
    }
})

// Get a specific song
export const getSong = createAsyncThunk('songs/getSong', async (songId, thunkAPI) => {
    try {
        return await songService.getSong(songId)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// Update a song's practiceTime array when the user HASN'T already practiced today
export const newPractice = createAsyncThunk('songs/newPractice', async (combinedInfo, thunkAPI) => {
    try {
        const { songId, minsToAdd } = combinedInfo
        console.log(songId, minsToAdd)
        return await songService.newPractice(songId, minsToAdd)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// Update a song's practiceTime array when the user HAS already practiced today
export const existingPractice = createAsyncThunk('songs/existingPractice', async (combinedInfo, thunkAPI) => {
    try {
        const { songId, minsToAdd, index } = combinedInfo
        console.log(songId, minsToAdd, index)
        return await songService.existingPractice(songId, minsToAdd, index)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})


export const songSlice = createSlice({
    name: 'song',
    initialState,
    reducers: {
        reset: (state) => {
            state.specificSong = null
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSongsByUser.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getSongsByUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.songList = action.payload
            })
            .addCase(getSong.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getSong.fulfilled, (state, action) => {
                state.specificSong = action.payload
                state.isLoading = false
                state.isSuccess = true
            })
            .addCase(existingPractice.pending, (state, action) => {
                // state.specificSong = null
            })
            .addCase(existingPractice.fulfilled, (state, action) => {
                state.isSuccess = true 
                state.specificSong = action.payload
            })
            .addCase(newPractice.pending, (state, action) => {
                // state.specificSong = null
            })
            .addCase(newPractice.fulfilled, (state, action) => {
                state.isSuccess = true
                state.specificSong = action.payload
            })
    }
})

export const { reset } = songSlice.actions
export default songSlice.reducer