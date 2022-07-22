import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import repertoireReducer from '../features/repertoire/repertoireSlice'
import songReducer from '../features/song/songSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    repertoire: repertoireReducer,
    song: songReducer
  },
});
