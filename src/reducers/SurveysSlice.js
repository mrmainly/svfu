import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [],
    arrayIndex: 0,
    modalText: '',
    modalOpenStatus: false,
    postData: [],
    timeStatus: false,
    expertTheoreticalPartModalOpen: false,
    subscribeCodeModal: false,
    conclusion_first_part: '',
    conclusion_second_part: '',
    pass_practical_part: false,
    pass_test_part: false,
    part: 'theoretical-part',
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
        openExpertTheoreticalPartOpen(state, action) {
            state.expertTheoreticalPartModalOpen = action.payload
        },
        openSubscribeModal(state, action) {
            state.subscribeCodeModal = action.payload
        },
        setTextAnswerExpert(state, action) {
            state.conclusion_first_part = action.payload[0]
            state.conclusion_second_part = action.payload[1]
            state.pass_practical_part = action.payload[2]
            state.pass_test_part = action.payload[3]
        },
        changePartsStatus(state, action) {
            state.part = action.payload
        },
    },
})

export default SurveysSlice.reducer
