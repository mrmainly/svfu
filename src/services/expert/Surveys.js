import { api } from '../api'

export const Surveys = api.injectEndpoints({
    endpoints: (build) => ({
        //ответ эксперта
        sendAnswerExpert: build.mutation({
            query({ body, id }) {
                return {
                    url: `expert/result/${id}`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'TestProcessing' }],
        }),
        //тест
        getSurveyExpertId: build.query({
            query(id) {
                return {
                    url: `/expert/result/${id}`,
                }
            },
        }),
        //подпись протокола
        sendSubscribeExpert: build.mutation({
            query({ id }) {
                return {
                    url: `tools/signature/detail/${id}`,
                    method: 'POST',
                }
            },
            invalidatesTags: [{ type: 'TestProcessing' }],
        }),

        //начало проваерки теста
        putMainExpert: build.mutation({
            query({ id }) {
                return {
                    url: `expert/result/${id}`,
                    method: 'PUT',
                }
            },
            invalidatesTags: [{ type: 'TestProcessing' }],
        }),
    }),
})

export const {
    useSendAnswerExpertMutation,
    useSendSubscribeExpertMutation,
    useGetSurveyExpertIdQuery,
    usePutMainExpertMutation,
} = Surveys
