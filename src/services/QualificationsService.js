import { api } from './api'

export const qualifications = api.injectEndpoints({
    endpoints: (build) => ({
        getQualifications: build.query({
            query: ({ currentPage }) => `users/qualification_improvement/?page=${currentPage}`,
            providesTags: ['Qualification'],
        }),
        getQualificationsId: build.query({
            query: ({ id }) => `users/qualification_improvement/${id}`,
            providesTags: ['Qualification'],
        }),
        patchQualificationId: build.mutation({
            query({ id, formData }) {
                return {
                    url: `users/qualification_improvement/${id}`,
                    method: 'PATCH',
                    body: formData,
                }
            },
            invalidatesTags: [{ type: 'Qualification' }],
        }),
        deleteQualificationId: build.mutation({
            query({ id }) {
                return {
                    url: `users/qualification_improvement/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [{ type: 'Qualification' }],
        }),
        postQualification: build.mutation({
            query({ formData }) {
                return {
                    url: `users/qualification_improvement/`,
                    method: 'POST',
                    body: formData,
                    header: 'multipart/form-data',
                }
            },
            invalidatesTags: [{ type: 'Qualification' }],
        }),
    }),
})

export const {
    useGetQualificationsQuery,
    useGetQualificationsIdQuery,
    usePatchQualificationIdMutation,
    usePostQualificationMutation,
    useDeleteQualificationIdMutation,
} = qualifications
