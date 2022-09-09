import { api } from './api'

export const surveys = api.injectEndpoints({
    endpoints: (build) => ({
        getDirection: build.query({
            query: () => `tester/direction/`,
        }),
        getTestResults: build.query({
            query: () => `tester/result/`,
        }),
        getTestResultsID: build.query({
            query: ({ id }) => `tester/result/${id}`,
            providesTags: ['Appeal'],
        }),

        getSurveysId: build.query({
            query: ({ id }) => `tester/survey/part-one/${id}`,
            async onQueryStarted(undefiend, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    window.localStorage.setItem('survey-datas', JSON.stringify(data, null, '\t'))
                } catch (err) {
                    console.log(err)
                }
            },
        }),
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
        appealPost: build.mutation({
            query({ body, id }) {
                return {
                    url: `tester/result/${id}/appeal/`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'Tests' }],
        }),
        appealPut: build.mutation({
            query({ id }) {
                return {
                    url: `tester/result/${id}/appeal/`,
                    method: 'PUT',
                }
            },
            invalidatesTags: [{ type: 'Tests' }],
        }),
        surveyPatch: build.mutation({
            query({ id }) {
                return {
                    url: `tester/survey/part-one/${id}`,
                    method: 'PATCH',
                }
            },
        }),
        getPracticalPartId: build.query({
            query: ({ id }) => `tester/survey/part-two/${id}`,
        }),
        practicalPartPost: build.mutation({
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
    useGetAvailableTestQuery,
    useGetDirectionQuery,
    useGetSurveysIdQuery,
    usePostResultPartOneMutation,
    useAppealPostMutation,
    useAppealPutMutation,
    useSurveyPatchMutation,
    useGetPracticalPartIdQuery,
    usePracticalPartPostMutation,
    useGetTestResultsQuery,
    useGetTestResultsIDQuery,
} = surveys
