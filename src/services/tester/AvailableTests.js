import { api } from '../api'

export const AvailableTests = api.injectEndpoints({
    endpoints: (build) => ({
        //Доступные тесты
        getAvailableTests: build.query({
            query: ({ currentPage, name, ordering, survey_status }) =>
                `tester/survey/?page=${currentPage}&name=${name}&ordering=${ordering}&survey_status=${survey_status}`,
            providesTags: ['SURVEYS_TESTER'],
        }),
    }),
})

export const { useGetAvailableTestsQuery } = AvailableTests
