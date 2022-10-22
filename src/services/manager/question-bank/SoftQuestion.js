import { api } from '../../api'

export const SoftQuestion = api.injectEndpoints({
    endpoints: (build) => ({
        getSoftQuestionList: build.query({
            query: ({ currentPage, id, is_active, name, direction }) =>
                `constructor/question/soft/?page=${currentPage}&ordering=${id}&is_active=${is_active}&name=${name}&direction=${direction}`,
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
