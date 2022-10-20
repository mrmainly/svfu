import { api } from '../../api'

export const SoftQuestion = api.injectEndpoints({
    endpoints: (build) => ({
        getSoftQuestionList: build.query({
            query: ({ currentPage, id, difficulty, is_active, description, direction }) =>
                `constructor/question/soft/?page=${currentPage}&ordering=${id}&difficulty=${difficulty}&is_active=${is_active}&description=${description}&direction=${direction}`,
            providesTags: ['SoftQuestion'],
        }),
        postConstructorSoftQuestion: build.mutation({
            query({ body }) {
                return {
                    url: `constructor/question/soft/`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'SoftQuestion' }],
        }),
    }),
})

export const { useGetSoftQuestionListQuery, usePostConstructorSoftQuestionMutation } = SoftQuestion
