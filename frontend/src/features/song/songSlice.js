import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import songService from './songService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    songList: null,
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
export const removeSong = createAsyncThunk('songs/removeSong', async(songId, thunkAPI) => {
    try {
        await songService.removeSong(songId)
    } catch (error) {
        thunkAPI.rejectWithValue('The song could not be found')
    }
})


export const songSlice = createSlice({
    name: 'song',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSongsByUser.pending, (state,action) => {
                state.isLoading = true
            })
            .addCase(getSongsByUser.fulfilled, (state, action) => {
                state.songList = action.payload
                state.isLoading = false
            })
    }
})

export const { reset } = songSlice.actions
export default songSlice.reducer