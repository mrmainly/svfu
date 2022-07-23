import { api } from "./api";

export const login = api.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query(body) {
                return {
                    url: `users/login/`,
                    method: "POST",
                    body,
                };
            },
        }),
        registerV1: build.mutation({
            query(body) {
                return {
                    url: `users/register/email/`,
                    method: "POST",
                    body,
                };
            },
        }),
        registerV2: build.mutation({
            query(body) {
                return {
                    url: `users/code/verify/`,
                    method: "POST",
                    body,
                };
            },
        }),
        registerV3: build.mutation({
            query(body) {
                return {
                    url: `users/register/profile/`,
                    method: "POST",
                    body,
                };
            },
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterV1Mutation,
    useRegisterV2Mutation,
    useRegisterV3Mutation,
} = login;
