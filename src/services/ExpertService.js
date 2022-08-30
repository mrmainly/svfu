import { api } from './api'

export const expert = api.injectEndpoints({
    endpoints: (build) => ({
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

export const { useSendAnswerExpertMutation, useSendSubscribeExpertMutation, useSendCodeMutation } =
    expert
