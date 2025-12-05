import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            console.log(action.payload)
        }
    },
})

// Action creators are generated for each case reducer function
export const { setUserDetailsuserDetails } = counterSlice.actions

export default UserSlice.reducer