import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    post_status: 'normal',
}

export const ProfileSlice = createSlice({
    name: 'ProfileSlice',
    initialState,
    reducers: {
        handleStatusPost(state, action) {
            state.post_status = action.payload
        },
    },
})

export default ProfileSlice.reducer
