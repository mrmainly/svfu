import {
    combineReducers,
    configureStore,
    getDefaultMiddleware,
} from "@reduxjs/toolkit";
// import productReducer from "../reducer/product_slice";
import { api } from "../services/api";

const rootReducer = combineReducers({
    // productReducer,
    [api.reducerPath]: api.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(api.middleware),
    });
};
