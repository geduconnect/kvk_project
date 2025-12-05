import { configureStore } from '@reduxjs/toolkit'
import userSlice from './userSlice'
import { useReducer } from 'react'
export default configureStore({
  reducer: {
    user: useReducer
  },
})