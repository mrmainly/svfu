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
                    url: `constructor/question/`,
                    method: 'POST',
                    body,
                }
            },
        }),
        questionCreateStepTwoPost: build.mutation({
            query({ body, id }) {
                return {
                    url: `constructor/question/${id}/choice`,
                    method: 'POST',
                    body,
                }
            },
        }),
        questionCreateStepThreePost: build.mutation({
            query({ body, id }) {
                return {
                    url: `constructor/question/${id}/choice`,
                    method: 'PATCH',
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
    useQuestionCreateStepTwoPostMutation,
} = QuestionCreate
