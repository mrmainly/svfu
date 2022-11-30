import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    testQuestionList: [],
    questionList: [],
    questionType: '',
    technique: '',
}

export const ConstructorQuestionSlice = createSlice({
    name: 'ConstructorQuestionSlice',
    initialState,
    reducers: {
        initializationQuestionList(state, action) {
            {
                state.testQuestionList.length == 0 && (state.questionList = action.payload)
            }
        },
        addItemQuestionList(state, action) {
            state.testQuestionList.push(action.payload)
            state.questionList.splice(
                state.questionList.findIndex((item) => item.id === action.payload.id),
                1
            )
        },
        deleteElement(state, action) {
            state.questionList.push(action.payload)
            state.testQuestionList.splice(
                state.testQuestionList.findIndex((item) => item.id === action.payload.id),
                1
            )
        },
        handleQuestionType(state, action) {
            state.questionType = action.payload
        },
        deleteChapter(state, action) {
            state.testQuestionList.forEach((item) => {
                item.chapterId === action.payload && state.questionList.push(item)
            })
            state.testQuestionList.splice(
                state.testQuestionList.findIndex((item) => item.chapterId === action.payload),
                1
            )
        },
        handleTechnique(state, action) {
            state.technique = action.payload
        },
    },
})

export default ConstructorQuestionSlice.reducer
