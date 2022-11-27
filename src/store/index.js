import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { api } from '../services/api'

import register_verison_slice from '../reducers/RegisterVersionSlice'
import forgot_version_slice from '../reducers/ForgotVersionSlice'
import survey_slice from '../reducers/SurveysSlice'
import dynamic_path_slice from '../reducers/DynamicPathSlice'
import profile_slice from '../reducers/ProfileSlice'
import constructor_question_slice from '../reducers/ConstructorQuestionSlice'

const rootReducer = combineReducers({
    register_verison_slice,
    forgot_version_slice,
    survey_slice,
    dynamic_path_slice,
    profile_slice,
    constructor_question_slice,
    [api.reducerPath]: api.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    })
}
