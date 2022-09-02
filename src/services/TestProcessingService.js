import { api } from './api'

export const testProcessing = api.injectEndpoints({
    endpoints: (build) => ({
        getTestProcessing: build.query({
            query: ({ currentPage }) => `expert/result/?page=${currentPage}`,
            providesTags: ['TestProcessing'],
        }),
    }),
})

export const { useGetTestProcessingQuery } = testProcessing
