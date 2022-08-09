import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: true,
    verify: false,
    profile: false,
    code: 0,
};

export const RegisterVersionSlice = createSlice({
    name: "RegisterVersionSlice",
    initialState,
    reducers: {
        handleOpenEmailVersion(state, action) {
            state.email = action.payload;
        },
        handleOpenVerifyVersion(state, action) {
            state.verify = action.payload;
        },
        handleOpenProfileVersion(state, action) {
            state.profile = action.payload;
        },
        addedCode(state, action) {
            state.code = action.payload;
        },
    },
});

export default RegisterVersionSlice.reducer;
