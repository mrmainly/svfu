import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: "https://notalone.medic.fun/api/v1/",
    prepareHeaders: (headers, { getState }) => {
        const token = localStorage.getItem("jwttokwn");
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
