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
        sendAnswerModerator: build.mutation({
            query({ body, id }) {
                return {
                    url: `moderator/result/${id}`,
                    method: 'POST',
                    body,
                }
            },
        }),
    }),
})

export const {
    useGetTestResultQuery,
    useGetSurveyModeratorIdQuery,
    useSendAnswerModeratorMutation,
} = moderator
