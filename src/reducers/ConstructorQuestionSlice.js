import { createSlice } from '@reduxjs/toolkit'

const initialState = {
        testQuestionList: [],
        questionList: [

        ]
}

export const ConstructorQuestionSlice = createSlice({
    name: 'ConstructorQuestionSlice',
    initialState,
    reducers: {
        initializationQuestionList(state, action) {
            {state.testQuestionList.length == 0 && (state.questionList = action.payload)}
        },
        addItemQuestionList(state, action) {
            state.testQuestionList.push(action.payload)
            state.questionList.splice(state.questionList.findIndex((item)=>item.id === action.payload.id), 1)
        },
        deleteElement(state, action) {
            state.questionList.push(action.payload)
            state.testQuestionList.splice(state.testQuestionList.findIndex((item)=>item.id === action.payload.id), 1)

        }
    },
})

export default ConstructorQuestionSlice.reducer
