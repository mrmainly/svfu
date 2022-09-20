import { api } from '../api'

export const Results = api.injectEndpoints({
    endpoints: (build) => ({
        //результат теста
        getTestResultsID: build.query({
            query: ({ id }) => `tester/result/${id}`,
            providesTags: ['Appeal'],
        }),
        //подать апелляцию
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
        //отменить апелляцию
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

export const { useAppealPostMutation, useAppealPutMutation, useGetTestResultsIDQuery } = Results
