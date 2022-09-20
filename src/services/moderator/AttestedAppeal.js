import { api } from '../api'

export const AttestedAppeal = api.injectEndpoints({
    endpoints: (build) => ({
        getModeratorAppeal: build.query({
            query: ({ currentPage, ordering, direction, userId, status, score }) =>
                `moderator/appeal/?page=${currentPage}&ordering=${ordering}&direction=${direction}&user_id=${userId}&status=${status}&score=${score}`,
            providesTags: ['ModeratorAppeal'],
        }),
        getAppealId: build.query({
            query({ id }) {
                return {
                    url: `moderator/appeal/${id}`,
                }
            },
        }),
        putAppealRejectId: build.mutation({
            query({ id }) {
                return {
                    url: `/moderator/appeal/${id}`,
                    method: 'PUT',
                }
            },
            invalidatesTags: [{ type: 'ModeratorAppeal' }],
        }),
        putAppealAcceptId: build.mutation({
            query({ id }) {
                return {
                    url: `/moderator/appeal/${id}`,
                    method: 'PATCH',
                }
            },
            invalidatesTags: [{ type: 'ModeratorAppeal' }],
        }),
    }),
})

export const {
    useGetModeratorAppealQuery,
    useGetAppealIdQuery,
    usePutAppealRejectIdMutation,
    usePutAppealAcceptIdMutation,
} = AttestedAppeal
