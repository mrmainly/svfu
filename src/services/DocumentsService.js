import { api } from './api'

export const documents = api.injectEndpoints({
    endpoints: (build) => ({
        getDocuments: build.query({
            query: ({ currentPage, documentType, name, ordering }) =>
                `users/document/?page=${currentPage}&document_type=${documentType}&name=${name}&ordering=${ordering}`,
            providesTags: ['Document'],
        }),
        postDocuments: build.mutation({
            query({ formData }) {
                return {
                    url: `users/document/`,
                    method: 'POST',
                    body: formData,
                    header: 'multipart/form-data',
                }
            },
            invalidatesTags: [{ type: 'Document' }],
        }),
        patchDocuments: build.mutation({
            query({ id, formData }) {
                return {
                    url: `users/document/${id}`,
                    method: 'PATCH',
                    body: formData,
                }
            },
            invalidatesTags: [{ type: 'Document' }],
        }),
        deleteDocument: build.mutation({
            query({ id }) {
                return {
                    url: `users/document/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [{ type: 'Document' }],
        }),
    }),
})

export const {
    useGetDocumentsQuery,
    usePostDocumentsMutation,
    usePatchDocumentsMutation,
    useDeleteDocumentMutation,
} = documents
