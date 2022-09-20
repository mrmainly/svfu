import { api } from '../api'

export const ForgotPassword = api.injectEndpoints({
    endpoints: (build) => ({
        forgotEmailVersion: build.mutation({
            query(body) {
                return {
                    url: `users/reset/email/`,
                    method: 'POST',
                    body,
                }
            },
        }),
        forgotPasswordVersion: build.mutation({
            query(body) {
                return {
                    url: `users/reset/password/`,
                    method: 'POST',
                    body,
                }
            },
        }),
    }),
})

export const { useForgotEmailVersionMutation, useForgotPasswordVersionMutation } = ForgotPassword
