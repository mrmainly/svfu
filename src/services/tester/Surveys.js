import { api } from '../api'

export const Surveys = api.injectEndpoints({
    endpoints: (build) => ({
        //теоретическая часть
        getSurveyPartOneId: build.query({
            query: ({ id }) => `tester/survey/part-one/${id}`,
            async onQueryStarted(undefiend, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    window.localStorage.setItem('survey-datas', JSON.stringify(data, null, '\t'))
                } catch (err) {
                    console.log(err)
                }
            },
            providesTags: ['SURVEYS_TESTER'],
        }),

        //начало теоретической части
        patchSurveyPartOne: build.mutation({
            query({ id }) {
                return {
                    url: `tester/survey/part-one/${id}`,
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
    }),
})

export const {
    useGetSurveyPartOneIdQuery,
    usePatchSurveyPartOneMutation,
    usePostResultPartOneMutation,
    usePostResultSoftMutation,
    useGetPracticalPartIdQuery,
    usePostPracticalPartMutation,
} = Surveys
