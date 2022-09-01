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
    subscribeCodeModalModerator: false,
    conclusion_first_part: '',
    conclusion_second_part: '',
    estimate: '',
    conclusion: '',
    pass_practical_part: false,
    pass_test_part: false,
    part: 'theoretical-part',
    part_tester: 't-p',
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
        openSubscribeModalModerator(state, action) {
            state.subscribeCodeModalModerator = action.payload
        },
        setTextAnswerExpert(state, action) {
            state.conclusion_first_part = action.payload[0]
            state.conclusion_second_part = action.payload[1]
            state.pass_practical_part = action.payload[2]
            state.pass_test_part = action.payload[3]
        },
        setTextAnswerModerator(state, action) {
            state.estimate = action.payload[0]
            state.conclusion = action.payload[1]
        },
        changePartsStatus(state, action) {
            state.part = action.payload
        },
        changePartTester(state, action) {
            state.part_tester = action.payload
        },
    },
})

export default SurveysSlice.reducer
