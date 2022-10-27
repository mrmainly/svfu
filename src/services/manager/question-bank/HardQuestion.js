import { api } from '../../api'

export const HardQuestion = api.injectEndpoints({
    endpoints: (build) => ({
        getConstructorQuestionId: build.query({
            query: ({ id }) => `constructor/question/${id}`,
            providesTags: ['ManagerConstructorQuestion'],
        }),
        postConstructorQuestion: build.mutation({
            query(body) {
                return {
                    url: `constructor/question/`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'ManagerConstructorQuestion' }],
        }),

        postConstructorAnswerQuestion: build.mutation({
            query({ id, body }) {
                return {
                    url: `constructor/answer/question/${id}`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'ManagerConstructorQuestion' }],
        }),
        putConstructorQuestion: build.mutation({
            query({ id }) {
                return {
                    url: `/constructor/question/${id}`,
                    method: 'PUT',
                }
            },
            invalidatesTags: [{ type: 'ManagerConstructorQuestion' }],
        }),
        patchConstructorQuestion: build.mutation({
            query({ id, body }) {
                return {
                    url: `constructor/question/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: [{ type: 'ManagerConstructorQuestion' }],
        }),

        patchConstructorAnswer: build.mutation({
            query({ id, body }) {
                return {
                    url: `constructor/answer/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: [{ type: 'ManagerConstructorQuestion' }],
        }),

        deleteConstructorAnswer: build.mutation({
            query(id) {
                return {
                    url: `constructor/answer/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [{ type: 'ManagerConstructorQuestion' }],
        }),
    }),
})

export const {
    useGetConstructorQuestionIdQuery,
    usePostConstructorQuestionMutation,
    usePostConstructorAnswerQuestionMutation,
    usePutConstructorQuestionMutation,
    usePatchConstructorQuestionMutation,
    usePatchConstructorAnswerMutation,
    useDeleteConstructorAnswerMutation,
} = HardQuestion
