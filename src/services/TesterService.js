import { api } from './api'

export const tester = api.injectEndpoints({
    endpoints: (build) => ({
        postTesterApplication: build.mutation({
            query(body) {
                return {
                    url: `tester/application/`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'Applying' }],
        }),
        putTesterApplication: build.mutation({
            query(id) {
                return {
                    url: `/tester/application/${id}/cancel/`,
                    method: 'PUT',
                }
            },
            invalidatesTags: [{ type: 'Applying' }],
        }),

        //подача заявления
        getTesterDirection: build.query({
            query: ({ currentPage, ordering, name }) =>
                `tester/direction/?page=${currentPage}&ordering=${ordering}&name=${name}`,
            providesTags: ['Applying'],
        }),

        //доступные тесты
        getTesterSurvey: build.query({
            query: ({ currentPage, name, ordering, survey_status }) =>
                `tester/survey/?page=${currentPage}&name=${name}&ordering=${ordering}&survey_status=${survey_status}`,
            providesTags: ['Tests'],
        }),
    }),
})
export const {
    useGetTesterDirectionQuery,
    usePostTesterApplicationMutation,
    usePutTesterApplicationMutation,

    //доступные тесты
    useGetTesterSurveyQuery,
} = tester
