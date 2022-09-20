import { api } from '../api'

export const Tags = api.injectEndpoints({
    endpoints: (build) => ({
        //список тегов
        getAttestationsTag: build.query({
            query: ({ currentPage, ordering, name }) =>
                `constructor/direction/tag?page=${currentPage}&ordering=${ordering}&name=${name}`,
            providesTags: ['Attestation'],
        }),
        postAttestationsTag: build.mutation({
            query(body) {
                return {
                    url: `constructor/direction/tag`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'Attestation' }],
        }),
        patchAttestationsTag: build.mutation({
            query({ body, id }) {
                return {
                    url: `constructor/direction/tag/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: [{ type: 'Attestation' }],
        }),
        deleteAttestationsTag: build.mutation({
            query({ id }) {
                return {
                    url: `constructor/direction/tag/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [{ type: 'Attestation' }],
        }),
    }),
})

export const {
    useGetAttestationsTagQuery,
    usePostAttestationsTagMutation,
    usePatchAttestationsTagMutation,
    useDeleteAttestationsTagMutation,
} = Tags
