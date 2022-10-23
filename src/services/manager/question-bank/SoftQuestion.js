import { api } from '../../api'

export const SoftQuestion = api.injectEndpoints({
    endpoints: (build) => ({
        getSoftQuestionList: build.query({
            query: ({ currentPage, id, is_active, name, direction }) =>
                `constructor/question/soft/?page=${currentPage}&ordering=${id}&is_active=${is_active}&name=${name}&direction=${direction}`,
            providesTags: ['SoftQuestion'],
        }),
        getSoftQuestionId: build.query({
            query: ({ id }) => `constructor/question/soft/${id}`,
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
        patchConstructorSoftQuestion: build.mutation({
            query({ body, id }) {
                return {
                    url: `constructor/question/soft/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: [{ type: 'SoftQuestion' }],
        }),
        patchQuestionSoftFile: build.mutation({
            query({ formData, id }) {
                return {
                    url: `constructor/question/${id}/file/`,
                    method: 'PATCH',
                    body: formData,
                }
            },
            invalidatesTags: [{ type: 'SoftQuestion' }, { type: 'ManagerConstructorQuestion' }],
        }),
    }),
})

export const {
    useGetSoftQuestionListQuery,
    usePostConstructorSoftQuestionMutation,
    useGetSoftQuestionIdQuery,
    usePatchConstructorSoftQuestionMutation,
    usePatchQuestionSoftFileMutation,
} = SoftQuestion
