import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email_form: true,
    password_form: false,
    verify_form: false,
    code: 0,
};

export const ForgotVersionSlice = createSlice({
    name: "RegisterVersionSlice",
    initialState,
    reducers: {
        handleOpenEmailFormVersion(state, action) {
            state.email_form = action.payload;
        },
        handleOpenPasswordFormVersion(state, action) {
            state.password_form = action.payload;
        },
        handleOpenVerifyFormVersion(state, action) {
            state.verify_form = action.payload;
        },
        addedCode(state, action) {
            state.code = action.payload;
        },
    },
});

export default ForgotVersionSlice.reducer;
