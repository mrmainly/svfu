import { api } from '../../api'

export const QuestionsBank = api.injectEndpoints({
    endpoints: (build) => ({
        getConstructorQuestion: build.query({
            query: ({ currentPage, id, difficulty, is_active, description, direction }) =>
                `constructor/question?page=${currentPage}&ordering=${id}&difficulty=${difficulty}&is_active=${is_active}&description=${description}&direction=${direction}`,
            providesTags: ['ManagerConstructorQuestion'],
        }),
        postConstructorQuestionImage: build.mutation({
            query({ formData }) {
                return {
                    url: 'constructor/question/image/',
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: [{ type: 'ManagerConstructorQuestion' }, { type: 'SoftQuestion' }],
        }),
        postConstructorQuestionFile: build.mutation({
            query({ formData }) {
                return {
                    url: `constructor/question/file/`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: [{ type: 'ManagerConstructorQuestion' }, { type: 'SoftQuestion' }],
        }),
        patchConstructorQuestionIdImage: build.mutation({
            query({ id, formData }) {
                return {
                    url: `constructor/question/${id}/image/`,
                    method: 'PATCH',
                    body: formData,
                }
            },
            invalidatesTags: [{ type: 'ManagerConstructorQuestion' }, { type: 'SoftQuestion' }],
        }),
        deleteConstructorQuestionIdFile: build.mutation({
            query(id) {
                return {
                    url: `constructor/question/${id}/file/`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [{ type: 'ManagerConstructorQuestion' }, { type: 'SoftQuestion' }],
        }),
        deleteConstructorQuestionIdImage: build.mutation({
            query(id) {
                return {
                    url: `constructor/question/${id}/image/`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [{ type: 'ManagerConstructorQuestion' }, { type: 'SoftQuestion' }],
        }),
    }),
})

export const {
    useGetConstructorQuestionQuery,
    useDeleteConstructorQuestionIdFileMutation,
    useDeleteConstructorQuestionIdImageMutation,
    usePatchConstructorQuestionIdImageMutation,
    usePostConstructorQuestionFileMutation,
    usePostConstructorQuestionImageMutation,
} = QuestionsBank
