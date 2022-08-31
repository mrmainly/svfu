import { api } from './api'

export const moderator = api.injectEndpoints({
    endpoints: (build) => ({
        getTestResult: build.query({
            query: () => `moderator/result/`,
            providesTags: ['Moderator'],
        }),
        sendAnswerExpert: build.mutation({
            query({ body, id }) {
                return {
                    url: `expert/result/${id}`,
                    method: 'POST',
                    body,
                }
            },
        }),
        sendSubscribeExpert: build.mutation({
            query({ id }) {
                return {
                    url: `tools/signature/detail/${id}`,
                    method: 'POST',
                }
            },
        }),
        sendCode: build.mutation({
            query({ code }) {
                return {
                    url: `tools/signature/${code}`,
                    method: 'POST',
                }
            },
        }),
    }),
})

export const {
    useGetTestResultQuery,
    useSendAnswerExpertMutation,
    useSendSubscribeExpertMutation,
    useSendCodeMutation,
} = moderator
