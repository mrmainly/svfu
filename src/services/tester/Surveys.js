import { api } from '../api'

export const Surveys = api.injectEndpoints({
    endpoints: (build) => ({
        //теоретическая часть
        getSurveyId: build.query({
            query: ({ id }) => `tester/survey/${id}`,

            providesTags: ['SURVEYS_TESTER'],
        }),

        //начало теоретической части
        patchSurvey: build.mutation({
            query({ id }) {
                return {
                    url: `tester/survey/${id}`,
                    method: 'PATCH',
                }
            },
            invalidatesTags: [{ type: 'SURVEYS_TESTER' }],
        }),

        //отправление ответов в теоретической чаcти
        postResultPartOne: build.mutation({
            query({ body, id }) {
                return {
                    url: `tester/survey/part-one/${id}`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'SURVEYS_TESTER' }],
        }),

        //отправление ответов в софт тесте
        postResultSoft: build.mutation({
            query({ body, id }) {
                return {
                    url: `tester/survey/soft/${id}`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'SURVEYS_TESTER' }],
        }),

        //практическая часть
        getPracticalPartId: build.query({
            query: ({ id }) => `tester/survey/part-two/${id}`,
        }),

        //отправление ответов в практической чаcти
        postPracticalPart: build.mutation({
            query({ body, id }) {
                return {
                    url: `tester/survey/part-two/${id}`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'SURVEYS_TESTER' }],
        }),

        //список заданий
        getTesterSurveyId: build.query({
            query: ({id}) => `tester/survey/soft/survey/${id}`,

            providesTags: ['SURVEYS_TESTER'],
        }),
    }),
})

export const {
    useGetSurveyIdQuery,
    usePatchSurveyMutation,
    usePostResultPartOneMutation,
    usePostResultSoftMutation,
    useGetPracticalPartIdQuery,
    usePostPracticalPartMutation,
    useGetTesterSurveyIdQuery,
} = Surveys
