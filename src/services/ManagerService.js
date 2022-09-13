import { api } from './api'

export const manager = api.injectEndpoints({
    endpoints: (build) => ({
        //Банк вопросов
        getConstructorQuestion: build.query({
            query: ({ currentPage, id, difficulty, is_active, description, direction }) =>
                `constructor/question/?page=${currentPage}&ordering=${id}&difficulty=${difficulty}&is_active=${is_active}&description=${description}&direction=${direction}`,
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
    //Банк вопросов
    useGetConstructorQuestionQuery,

    usePostConstructorQuestionImageMutation,
    usePostConstructorQuestionMutation,
    usePostConstructorQuestionFileMutation,
    usePostConstructorAnswerQuestionMutation,

    usePutConstructorQuestionMutation,

    usePatchConstructorQuestionMutation,
    usePatchConstructorQuestionIdImageMutation,
    usePatchConstructorAnswerMutation,

    useDeleteConstructorQuestionIdFileMutation,
    useDeleteConstructorQuestionIdImageMutation,
    useDeleteConstructorAnswerMutation,
} = manager
