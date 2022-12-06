import { api } from '../api'

export const Statement = api.injectEndpoints({
    endpoints: (build) => ({
        //Подача заявления
        getStatement: build.query({
            query: ({ currentPage, ordering, name }) =>
                `tester/direction/?page=${currentPage}&ordering=${ordering}&name=${name}`,
            providesTags: ['Applying'],
        }),

        //отправка заявления
        postStatement: build.mutation({
            query({ id }) {
                return {
                    url: `tester/application/${id}`,
                    method: 'POST',
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
    }),
})

export const { useGetStatementQuery, usePostStatementMutation, usePutStatementMutation } = Statement
