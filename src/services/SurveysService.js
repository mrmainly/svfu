import { api } from './api'
import { SurveysSlice } from '../reducers/SurveysSlice'

const { getData } = SurveysSlice.actions

export const surveys = api.injectEndpoints({
    endpoints: (build) => ({
        getSurveys: build.query({
            query: () => `tester/survey/`,
        }),
        getTestResults: build.query({
            query: ({ id }) => `tester/result/`,
        }),
        getSurveysId: build.query({
            query: ({ id }) => `tester/survey/part-one/${id}`,
            async onQueryStarted(undefiend, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    window.localStorage.setItem('survey-datas', JSON.stringify(data, null, '\t'))
                } catch (err) {
                    console.log(err)
                }
            },
        }),
        surveyPost: build.mutation({
            query({ body, id }) {
                return {
                    url: `tester/survey/part-one/${id}`,
                    method: 'POST',
                    body,
                }
            },
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
        }),
    }),
})

export const {
    useGetSurveysQuery,
    useGetSurveysIdQuery,
    useSurveyPostMutation,
    useSurveyPatchMutation,
    useGetPracticalPartIdQuery,
    usePracticalPartPostMutation,
    useGetTestResultsQuery,
} = surveys
