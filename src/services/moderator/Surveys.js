import { api } from '../api'

export const ModeratorSurveys = api.injectEndpoints({
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
    useGetModeratorUserIdQuery,
    useSendAnswerModeratorMutation,
    useSendAnswerMainModeratorMutation,
    useGetSurveyModeratorIdQuery,
} = ModeratorSurveys
