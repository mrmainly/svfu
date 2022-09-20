import { api } from './api'

export const expert = api.injectEndpoints({
    endpoints: (build) => ({
        //обработка тестов
        getExpertResult: build.query({
            query: ({ currentPage, direction, userId, statusResult, ordering }) =>
                `expert/result/?page=${currentPage}&direction=${direction}&user_id=${userId}&status_result=${statusResult}&ordering=${ordering}`,
            providesTags: ['TestProcessing'],
        }),
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
        //проверка кода
        sendCode: build.mutation({
            query({ code }) {
                return {
                    url: `tools/signature/${code}`,
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
    useGetExpertResultQuery,
    useSendAnswerExpertMutation,
    useSendSubscribeExpertMutation,
    useSendCodeMutation,
    useGetSurveyExpertIdQuery,
    usePutMainExpertMutation,
} = expert
