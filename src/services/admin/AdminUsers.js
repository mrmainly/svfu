import { api } from '../api'

export const AdminUsers = api.injectEndpoints({
    endpoints: (build) => ({
        //отправка email
        forgotEmailVersion: build.mutation({
            query(body) {
                return {
                    url: `users/reset/email/`,
                    method: 'POST',
                    body,
                }
            },
        }),
        //Новый пароль
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

export const { useForgotEmailVersionMutation, useForgotPasswordVersionMutation } = AdminUsers
