import { api } from '../api'

export const Registration = api.injectEndpoints({
    endpoints: (build) => ({
        registerEmailVersion: build.mutation({
            query(body) {
                return {
                    url: `users/register/email/`,
                    method: 'POST',
                    body,
                }
            },
        }),
        registerProfileVersion: build.mutation({
            query(body) {
                return {
                    url: `users/register/profile/`,
                    method: 'POST',
                    body,
                }
            },
        }),
    }),
})

export const { useRegisterEmailVersionMutation, useRegisterProfileVersionMutation } = Registration
