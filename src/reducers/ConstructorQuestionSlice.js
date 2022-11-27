import { createSlice } from '@reduxjs/toolkit'

const initialState = {
        questionList: []
}

export const ConstructorQuestionSlice = createSlice({
    name: 'ConstructorQuestionSlice',
    initialState,
    reducers: {
        addItemQuestionList(state, action) {
            state.questionList.push(action.payload)
        },
        deleteElement(state, action) {
            state.questionList.splice(action.payload, 1);
        }
    },
})

export default ConstructorQuestionSlice.reducer
