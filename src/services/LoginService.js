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
        registerEmailVersion: build.mutation({
            query(body) {
                return {
                    url: `users/register/email/`,
                    method: "POST",
                    body,
                };
            },
        }),
        registerVerifyVersion: build.mutation({
            query(body) {
                return {
                    url: `users/code/verify/`,
                    method: "POST",
                    body,
                };
            },
        }),
        registerProfileVersion: build.mutation({
            query(body) {
                return {
                    url: `users/register/profile/`,
                    method: "POST",
                    body,
                };
            },
        }),
        forgotEmailVersion: build.mutation({
            query(body) {
                return {
                    url: `users/reset/email/`,
                    method: "POST",
                    body,
                };
            },
        }),
        forgotPasswordVersion: build.mutation({
            query(body) {
                return {
                    url: `users/reset/password/`,
                    method: "POST",
                    body,
                };
            },
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterEmailVersionMutation,
    useRegisterProfileVersionMutation,
    useRegisterVerifyVersionMutation,
    useForgotEmailVersionMutation,
    useForgotPasswordVersionMutation,
} = login;
