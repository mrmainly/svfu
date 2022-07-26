import { api } from '../api'

export const Login = api.injectEndpoints({
    endpoints: (build) => ({
        //авторизация
        login: build.mutation({
            query(body) {
                return {
                    url: `users/login/`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'Profile' }],
        }),
    }),
})

export const { useLoginMutation } = Login
