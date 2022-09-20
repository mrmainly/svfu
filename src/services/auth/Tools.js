import { api } from '../api'

export const Tools = api.injectEndpoints({
    endpoints: (build) => ({
        //авторизация
        postVerifyCode: build.mutation({
            query(body) {
                return {
                    url: `users/code/verify/`,
                    method: 'POST',
                    body,
                }
            },
        }),
    }),
})

export const { usePostVerifyCodeMutation } = Tools
