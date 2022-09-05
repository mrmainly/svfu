import { api } from './api'

export const moderator = api.injectEndpoints({
    endpoints: (build) => ({
        getSurveyModeratorId: build.query({
            query(id) {
                return {
                    url: `/moderator/result/${id}`,
                }
            },
        }),
        getModeratorUserId: build.query({
            query({ id }) {
                return {
                    url: `/moderator/result/${id}/user/`,
                }
            },
        }),
        sendAnswerModerator: build.mutation({
            query({ body, id }) {
                return {
                    url: `moderator/result/${id}`,
                    method: 'POST',
                    body,
                }
            },
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
        putMainModerator: build.mutation({
            query({ id }) {
                return {
                    url: `moderator/result/${id}`,
                    method: 'PUT',
                }
            },
        }),
        sendAnswerMainModerator: build.mutation({
            query({ id }) {
                return {
                    url: `moderator/result/finished/${id}`,
                    method: 'POST',
                }
            },
        }),
    }),
})

export const {
    useGetAppealIdQuery,
    useGetSurveyModeratorIdQuery,
    useGetModeratorUserIdQuery,
    useSendAnswerModeratorMutation,
    useSendAnswerMainModeratorMutation,
    usePutAppealRejectIdMutation,
    usePutAppealAcceptIdMutation,
    usePutMainModeratorMutation,
} = moderator
