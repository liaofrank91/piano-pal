import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import repertoireService from './repertoireService'

// Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
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
        // builder
        //     .addCase(register.pending, (state) => {
        //         state.isLoading = true
        //     })
        //     .addCase(register.fulfilled, (state, action) => {
        //         state.isLoading = false
        //         state.isSuccess = true
        //         state.user = action.payload
        //         // :0 I'm pretty sure action is tied to to the register function, which was a function constructed with createAsyncThunk, and the action.payload is the return value 
        //     })
        //     .addCase(register.rejected, (state, action) => {
        //         state.isLoading = false
        //         state.isError = true
        //         state.message = action.payload
        //         state.user = null
        //     })
        //     .addCase(login.pending, (state) => {
        //         state.isLoading = true
        //     })
        //     .addCase(login.fulfilled, (state, action) => {
        //         state.isLoading = false
        //         state.isSuccess = true
        //         state.user = action.payload
        //     })
        //     .addCase(login.rejected, (state, action) => {
        //         state.isLoading = false
        //         state.isError = true
        //         state.message = action.payload
        //         state.user = null
        //     })
        //     .addCase(logout.fulfilled, (state) => {
        //         state.user = null
        //     })
    }
})

export const {reset} = repertoireSlice.actions
export default repertoireSlice.reducer