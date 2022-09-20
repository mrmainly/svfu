import { api } from './api'

export const tester = api.injectEndpoints({
    endpoints: (build) => ({
        //Подача заявления
        getStatement: build.query({
            query: ({ currentPage, ordering, name }) =>
                `tester/direction/?page=${currentPage}&ordering=${ordering}&name=${name}`,
            providesTags: ['Applying'],
        }),

        //отправка заявления
        postStatement: build.mutation({
            query(body) {
                return {
                    url: `tester/application/`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'Applying' }],
        }),

        //отмена заявления
        putStatement: build.mutation({
            query(id) {
                return {
                    url: `/tester/application/${id}/cancel/`,
                    method: 'PUT',
                }
            },
            invalidatesTags: [{ type: 'Applying' }],
        }),

        //Доступные тесты
        getAvailableTests: build.query({
            query: ({ currentPage, name, ordering, survey_status }) =>
                `tester/survey/?page=${currentPage}&name=${name}&ordering=${ordering}&survey_status=${survey_status}`,
            providesTags: ['SURVEYS_TESTER'],
        }),

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
    useGetStatementQuery,
    usePostStatementMutation,
    usePutStatementMutation,
    useGetAvailableTestsQuery,
    useGetSurveyPartOneIdQuery,
    usePatchSurveyPartOneMutation,
    usePostResultPartOneMutation,
    useGetPracticalPartIdQuery,
    usePostPracticalPartMutation,
} = tester
