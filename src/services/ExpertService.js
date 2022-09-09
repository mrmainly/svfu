import { api } from './api'

export const expert = api.injectEndpoints({
    endpoints: (build) => ({
        getExpertResult: build.query({
            query: ({ currentPage, direction, userId, statusResult, ordering }) =>
                `expert/result/?page=${currentPage}&direction=${direction}&user_id=${userId}&status_result=${statusResult}&ordering=${ordering}`,
            providesTags: ['TestProcessing'],
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
        getSurveyExpertId: build.query({
            query(id) {
                return {
                    url: `/expert/result/${id}`,
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
        putMainExpert: build.mutation({
            query({ id }) {
                return {
                    url: `expert/result/${id}`,
                    method: 'PUT',
                }
            },
        }),
    }),
})

export const {
    useGetExpertResultQuery,
    useSendAnswerExpertMutation,
    useSendSubscribeExpertMutation,
    useSendCodeMutation,
    useGetSurveyExpertIdQuery,
    usePutMainExpertMutation,
} = expert
