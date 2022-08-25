import { api } from './api'

export const testProcessing = api.injectEndpoints({
    endpoints: (build) => ({
        getTestProcessing: build.query({
            query: () => `expert/result/`,
            providesTags: ['TestProcessing'],
        }),
    }),
})

export const { useGetTestProcessingQuery } = testProcessing
