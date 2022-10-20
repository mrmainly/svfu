import { api } from '../../api'

export const QuestionsBank = api.injectEndpoints({
    endpoints: (build) => ({
        getConstructorQuestion: build.query({
            query: ({ currentPage, id, difficulty, is_active, description, direction }) =>
                `constructor/question/?page=${currentPage}&ordering=${id}&difficulty=${difficulty}&is_active=${is_active}&description=${description}&direction=${direction}`,
            providesTags: ['ManagerConstructorQuestion'],
        }),
        postConstructorQuestionImage: build.mutation({
            query({ id, formData }) {
                return {
                    url: `constructor/question/image/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: [{ type: 'ManagerConstructorQuestion' }],
        }),
        postConstructorQuestionFile: build.mutation({
            query({ id, formData }) {
                return {
                    url: `constructor/question/file/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: [{ type: 'ManagerConstructorQuestion' }],
        }),
        patchConstructorQuestionIdImage: build.mutation({
            query({ id, formData }) {
                return {
                    url: `constructor/question/${id}/image/`,
                    method: 'PATCH',
                    body: formData,
                }
            },
            invalidatesTags: [{ type: 'ManagerConstructorQuestion' }],
        }),
        deleteConstructorQuestionIdFile: build.mutation({
            query(id) {
                return {
                    url: `constructor/question/${id}/file/`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [{ type: 'ManagerConstructorQuestion' }],
        }),
        deleteConstructorQuestionIdImage: build.mutation({
            query(id) {
                return {
                    url: `constructor/question/${id}/image/`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [{ type: 'ManagerConstructorQuestion' }],
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
