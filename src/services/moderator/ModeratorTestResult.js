import { api } from '../api'

export const ModeratorTestResult = api.injectEndpoints({
    endpoints: (build) => ({
        //результаты тестирования
        getModeratorResult: build.query({
            query: ({ currentPage, direction, userId, statusResult, ordering }) =>
                `moderator/result/?page=${currentPage}&direction=${direction}&user_id=${userId}&status_result=${statusResult}&ordering=${ordering}`,
            providesTags: ['TestResult'],
        }),
        putMainModerator: build.mutation({
            query({ id }) {
                return {
                    url: `moderator/result/${id}`,
                    method: 'PUT',
                }
            },
        }),
    }),
})

export const { useGetModeratorResultQuery, usePutMainModeratorMutation } = ModeratorTestResult
