import { api } from './api'

export const attestation = api.injectEndpoints({
    endpoints: (build) => ({
        getAttestationsTag: build.query({
            query: () => `constructor/direction/tag`,
            providesTags: ['Attestation'],
        }),
        getAttestationsQualification: build.query({
            query: () => `constructor/direction/`,
            providesTags: ['Attestation'],
        }),
        postAttestationsQualification: build.mutation({
            query(body) {
                return {
                    url: `constructor/direction/`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'Attestation' }],
        }),
        patchAttestationsQualificationId: build.mutation({
            query({ id, body }) {
                return {
                    url: `/constructor/direction/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: [{ type: 'Attestation' }],
        }),
        putAttestationsQualificationId: build.mutation({
            query({ id }) {
                return {
                    url: `/constructor/direction/${id}`,
                    method: 'PUT',
                }
            },
            invalidatesTags: [{ type: 'Attestation' }],
        }),
        getAttestationsTestsBank: build.query({
            query: () => `constructor/unit/`,
            providesTags: ['Attestation'],
        }),
        postAttestationsTestsBank: build.mutation({
            query(body) {
                return {
                    url: `constructor/unit/`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'Attestation' }],
        }),
        patchAttestationsTestsBankId: build.mutation({
            query({ id, body }) {
                return {
                    url: `/constructor/unit/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: [{ type: 'Attestation' }],
        }),
        getAttestationsQuestionsBank: build.query({
            query: () => `constructor/question/`,
            providesTags: ['Attestation'],
        }),
        postAttestationsQuestionsBank: build.mutation({
            query(body) {
                return {
                    url: `constructor/question/`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'Attestation' }],
        }),
        patchAttestationsQuestionsBank: build.mutation({
            query({ id, body }) {
                return {
                    url: `constructor/question/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: [{ type: 'Attestation' }],
        }),
        postAttestationsQuestionsBankImage: build.mutation({
            query({ id, formData }) {
                return {
                    url: `constructor/question/image/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: [{ type: 'Attestation' }],
        }),
        patchAttestationsQuestionsBankImage: build.mutation({
            query({ id, formData }) {
                return {
                    url: `constructor/question/${id}/image/`,
                    method: 'PATCH',
                    body: formData,
                }
            },
            invalidatesTags: [{ type: 'Attestation' }],
        }),
        deleteAttestationsQuestionsBankImage: build.mutation({
            query(id) {
                return {
                    url: `constructor/question/${id}/image/`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [{ type: 'Attestation' }],
        }),
        postAttestationsQuestionsBankFile: build.mutation({
            query({ id, formData }) {
                return {
                    url: `constructor/question/file/${id}`,
                    method: 'POST',
                    body: formData,
                }
            },
            invalidatesTags: [{ type: 'Attestation' }],
        }),
        deleteAttestationsQuestionsBankFile: build.mutation({
            query(id) {
                return {
                    url: `constructor/question/${id}/file/`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [{ type: 'Attestation' }],
        }),
        patchAttestationsQuestionsBank: build.mutation({
            query({ id, body }) {
                return {
                    url: `constructor/question/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: [{ type: 'Attestation' }],
        }),
        patchAttestationsQuestionsAnswer: build.mutation({
            query({ id, body }) {
                return {
                    url: `constructor/answer/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: [{ type: 'Attestation' }],
        }),
    }),
})

export const {
    useGetAttestationsTagQuery,
    useGetAttestationsTestsBankQuery,
    useGetAttestationsQuestionsBankQuery,
    useGetAttestationsQualificationQuery,
    usePostAttestationsTestsBankMutation,
    usePostAttestationsQualificationMutation,
    usePostAttestationsQuestionsBankMutation,
    usePostAttestationsQuestionsBankImageMutation,
    usePostAttestationsQuestionsBankFileMutation,
    usePatchAttestationsTestsBankIdMutation,
    usePatchAttestationsQualificationIdMutation,
    usePatchAttestationsQuestionsBankMutation,
    usePatchAttestationsQuestionsBankImageMutation,
    usePatchAttestationsQuestionsAnswerMutation,
    usePutAttestationsQualificationIdMutation,
    useDeleteAttestationsQuestionsBankFileMutation,
    useDeleteAttestationsQuestionsBankImageMutation,
} = attestation
