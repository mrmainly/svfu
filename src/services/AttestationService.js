import { api } from './api'

export const attestation = api.injectEndpoints({
    endpoints: (build) => ({
        getAttestationsQualification: build.query({
            query: ({ is_active }) => `constructor/direction/?is_active=${is_active}`,
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
        // getQualificationsId: build.query({
        //   query: ({ id }) => `users/qualification_improvement/${id}`,
        //   providesTags: ["Qualification"],
        // }),
        // patchQualificationId: build.mutation({
        //   query({ id, formData }) {
        //     return {
        //       url: `users/qualification_improvement/${id}`,
        //       method: "PATCH",
        //       body: formData,
        //     };
        //   },
        //   invalidatesTags: [{ type: "Qualification" }],
        // }),
        // postQualification: build.mutation({
        //   query({ formData }) {
        //     return {
        //       url: `users/qualification_improvement/`,
        //       method: "POST",
        //       body: formData,
        //       header: "multipart/form-data",
        //     };
        //   },
        //   invalidatesTags: [{ type: "Qualification" }],
        // }),
    }),
})

export const {
    useGetAttestationsQualificationQuery,
    usePostAttestationsQualificationMutation,
    usePatchAttestationsQualificationIdMutation,
    usePutAttestationsQualificationIdMutation,
    useGetAttestationsTestsBankQuery,
    usePostAttestationsTestsBankMutation,
} = attestation
