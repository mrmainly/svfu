import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import cookie from "js-cookie";

const jwttoken = cookie.get("jwttoken");

const baseQuery = fetchBaseQuery({
    baseUrl: "https://notalone.medic.fun/api/v1/",
    prepareHeaders: (headers, { getState }) => {
        const token = jwttoken;
        if (token) {
            headers.set("authentication", `Token ${token}`);
        }
        return headers;
    },
});

// const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const api = createApi({
    reducerPath: "splitApi",

    baseQuery: baseQuery,

    tagTypes: ["Products", "Provider"],

    endpoints: () => ({}),
});
