import { api } from '../api'

export const AttestationQualification = api.injectEndpoints({
    endpoints: (build) => ({
        //Квалификации аттестаций
        getAttestationsQualification: build.query({
            query: ({ is_active, name, tag, currentPage, id }) =>
                `constructor/direction/?is_active=${is_active}&name=${name}&tag=${tag}&page=${currentPage}&ordering=${id}`,
            providesTags: ['Attestation'],
        }),

        //создание квалификации аттестаций
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
        //редактирование квалификации аттестаций
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
        //изменение статуса квалификации аттестаций
        putAttestationsQualificationId: build.mutation({
            query({ id }) {
                return {
                    url: `/constructor/direction/${id}`,
                    method: 'PUT',
                }
            },
            invalidatesTags: [{ type: 'Attestation' }],
        }),
        getAttestationsTagList: build.query({
            query: (name) => `constructor/direction/tag/autocomplete?name=${name}`,
        }),
    }),
})

export const {
    useGetAttestationsQualificationQuery,
    usePostAttestationsQualificationMutation,
    usePatchAttestationsQualificationIdMutation,
    usePutAttestationsQualificationIdMutation,
    useGetAttestationsTagListQuery,
} = AttestationQualification
