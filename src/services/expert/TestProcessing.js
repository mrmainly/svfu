import { api } from '../api'

export const TestProcessing = api.injectEndpoints({
    endpoints: (build) => ({
        //обработка тестов
        getTestProcessing: build.query({
            query: ({ currentPage, direction, userId, statusResult, ordering, unit_type }) =>
                `expert/result/?page=${currentPage}&direction=${direction}&user_id=${userId}&status_result=${statusResult}&ordering=${ordering}&unit_type=${unit_type}`,
            providesTags: ['TestProcessing'],
        }),
    }),
})

export const { useGetTestProcessingQuery } = TestProcessing
