import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    path: '',
    current_path: '',
    role: '',
    full_name: '',
}

export const DynamicPathSlice = createSlice({
    name: 'DynamicPathSlice',
    initialState,
    reducers: {
        handlePath(state, action) {
            state.path = action.payload
        },
        handleCurrentPath(state, action) {
            state.current_path = action.payload
        },
        handleRole(state, action) {
            state.role = action.payload
        },
        handleFullName(state, action) {
            state.full_name = action.payload
        },
    },
})

export default DynamicPathSlice.reducer
