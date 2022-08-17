import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    arrayIndex: 0,
    modalText: "",
    modalOpenStatus: false,
};

export const SurveysSlice = createSlice({
    name: "SurveysSlice",
    initialState,
    reducers: {
        getData(state, action) {
            state.data = action.payload;
        },
        handleArrayIndex(state, action) {
            state.arrayIndex = action.payload;
        },
        handleModalStatus(state, action) {
            state.modalOpenStatus = action;
        },
    },
});

export default SurveysSlice.reducer;
