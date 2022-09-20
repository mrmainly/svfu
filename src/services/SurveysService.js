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

        appealPost: build.mutation({
            query({ body, id }) {
                return {
                    url: `tester/result/${id}/appeal/`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'SURVEYS_TESTER' }],
        }),
        appealPut: build.mutation({
            query({ id }) {
                return {
                    url: `tester/result/${id}/appeal/`,
                    method: 'PUT',
                }
            },
            invalidatesTags: [{ type: 'SURVEYS_TESTER' }],
        }),
    }),
})

export const {
    useGetDirectionQuery,
    useAppealPostMutation,
    useAppealPutMutation,
    useGetTestResultsQuery,
    useGetTestResultsIDQuery,
} = surveys
