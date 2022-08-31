import { api } from './api'

export const moderator = api.injectEndpoints({
    endpoints: (build) => ({
        getTestResult: build.query({
            query: () => `moderator/result/`,
            providesTags: ['Moderator'],
        }),
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
        getAppeal: build.query({
            query: () => `moderator/appeal/`,
            providesTags: ['Moderator'],
        }),
        getAppealId: build.query({
            query(id) {
                return {
                    url: `moderator/appeal/${id}`,
                }
            },
            providesTags: ['Moderator'],
        }),
    }),
})

export const {
    useGetTestResultQuery,
    useGetAppealQuery,
    useGetAppealIdQuery,
    useGetSurveyModeratorIdQuery,
    useGetModeratorUserIdQuery,
    useSendAnswerModeratorMutation,
} = moderator
