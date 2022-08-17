import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [],
    arrayIndex: 0,
    modalText: '',
    modalOpenStatus: false,
    postData: [],
}

export const SurveysSlice = createSlice({
    name: 'SurveysSlice',
    initialState,
    reducers: {
        getData(state, action) {
            state.data = action.payload
        },
        handleArrayIndex(state, action) {
            state.arrayIndex = action.payload
        },
        handleModalStatus(state, action) {
            state.modalOpenStatus = action.payload
        },
        addModalText(state, action) {
            state.modalText = action.payload
        },
        addPostData(state, action) {
            state.postData = action.payload
        },
    },
})

export default SurveysSlice.reducer
