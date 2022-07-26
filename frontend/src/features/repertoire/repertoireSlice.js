import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import repertoireService from './repertoireService'

const initialState = {
    repertoireList: null,
    triggerGetRepertoireSongs: false,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Add to repertoire
export const addToRepertoire = createAsyncThunk('repertoire/add', async (songData, thunkAPI) => {
    try {
        return await repertoireService.addToRepertoire(songData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// Get repertoire
export const getRepertoire = createAsyncThunk('repertoire/get', async (repertoireData, thunkAPI) => {
    try {
        return await repertoireService.getRepertoire(repertoireData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

// Remove from repertoire
export const removeFromRepertoire = createAsyncThunk('repertoire/remove', async (user, thunkAPI) => {
    // try {
    //     return await authService.login(user)
    // } catch (error) {
    //     const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

    //     return thunkAPI.rejectWithValue(message)
    // }
})


export const repertoireSlice = createSlice({
    name: 'repertoire',
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
            .addCase(getRepertoire.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getRepertoire.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.repertoireList = action.payload.songIdArray
                state.triggerGetRepertoireSongs = true
                // ^ this kicks off step 2
            })

    }
})

export const {reset} = repertoireSlice.actions
export default repertoireSlice.reducer