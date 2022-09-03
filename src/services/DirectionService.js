import { api } from './api'

export const direction = api.injectEndpoints({
    endpoints: (build) => ({
        // getDirection: build.query({
        //     query: () => `tester/direction/`,
        //     providesTags: ['Direction'],
        // }),
        postDirection: build.mutation({
            query(body) {
                return {
                    url: `tester/application/`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'Direction' }],
        }),
        putDirection: build.mutation({
            query(id) {
                return {
                    url: `/tester/application/${id}/cancel/`,
                    method: 'PUT',
                }
            },
            invalidatesTags: [{ type: 'Direction' }],
        }),
    }),
})

export const {
    // useGetDirectionQuery,
    usePostDirectionMutation,
    usePutDirectionMutation,
} = direction
