import { api } from '../../api'

export const QuestionCreate = api.injectEndpoints({
    endpoints: (build) => ({
        getConstructorQuestion: build.query({
            query: ({ currentPage, id, difficulty, is_active, description, direction }) =>
                `constructor/question/?page=${currentPage}&ordering=${id}&difficulty=${difficulty}&is_active=${is_active}&description=${description}&direction=${direction}`,
            providesTags: ['ManagerConstructorQuestion'],
        }),
        questionCreateStepOnePost: build.mutation({
            query(body) {
                return {
                    url: `constructor/question`,
                    method: 'POST',
                    body,
                }
            },
        }),
        questionCreateChoise: build.mutation({
            query({ body, id }) {
                return {
                    url: `constructor/question/${id}/choice`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'ManagerConstructorQuestion' }],
        }),
        questionCreateInputPost: build.mutation({
            query({ id, body }) {
                return {
                    url: `constructor/question/${id}/input`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'ManagerConstructorQuestion' }],
        }),
        questionCreateMatchingPost: build.mutation({
            query({ id, body }) {
                return {
                    url: `constructor/question/${id}/matching`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'ManagerConstructorQuestion' }],
        }),
        questionCreateMatrixPost: build.mutation({
            query({ id, body }) {
                return {
                    url: `constructor/question/${id}/matrix`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'ManagerConstructorQuestion' }],
        }),
        questionCreatePollPost: build.mutation({
            query({ id, body }) {
                return {
                    url: `constructor/question/${id}/poll`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'ManagerConstructorQuestion' }],
        }),
        questionDelete: build.mutation({
            query({ body, id }) {
                return {
                    url: `constructor/question/${id}`,
                    method: 'DELETE',
                    body,
                }
            },
            invalidatesTags: [{ type: 'ManagerConstructorQuestion' }],
        }),
    }),
})

export const {
    useGetConstructorQuestionQuery,
    useQuestionCreateStepOnePostMutation,
    useQuestionCreateChoiseMutation,
    useQuestionCreateInputPostMutation,
    useQuestionDeleteMutation,
    useQuestionCreateMatchingPostMutation,
    useQuestionCreateMatrixPostMutation,
    useQuestionCreatePollPostMutation,
} = QuestionCreate
