import { api } from './api'

export const pagination = api.injectEndpoints({
    endpoints: (build) => ({
        getDirection: build.query({
            query: ({ currentPage }) => `tester/direction/?page=${currentPage}`,
            providesTags: ['Direction'],
        }),
    }),
})

export const { useGetDirectionQuery } = pagination
