import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
};

export const SurveysSlice = createSlice({
    name: "SurveysSlice",
    initialState,
    reducers: {
        getData(state, action) {
            state.data = action.payload;
        },
    },
});

export default SurveysSlice.reducer;
