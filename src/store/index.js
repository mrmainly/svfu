import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
// import productReducer from "../reducer/product_slice";
import { api } from '../services/api'

import register_verison_slice from '../reducers/RegisterVersionSlice'
import forgot_version_slice from '../reducers/ForgotVersionSlice'
import survey_slice from '../reducers/SurveysSlice'

const rootReducer = combineReducers({
    register_verison_slice,
    forgot_version_slice,
    survey_slice,
    [api.reducerPath]: api.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    })
}
