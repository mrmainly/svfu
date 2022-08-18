import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [],
    arrayIndex: 0,
    modalText: '',
    modalOpenStatus: false,
    postData: [],
    timeStatus: false,
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
        changeTimeStatus(state, action) {
            state.timeStatus = action.payload
        },
    },
})

export default SurveysSlice.reducer
