import { api } from "./api";

export const qualifications = api.injectEndpoints({
    endpoints: (build) => ({
        getQualifications: build.query({
            query: () => `users/qualification_improvement/`,
            providesTags: ["Qualification"],
        }),
        getQualificationsId: build.query({
            query: ({ id }) => `users/qualification_improvement/${id}`,
        }),
        patchQualificationId: build.mutation({
            query({ id, formData }) {
                return {
                    url: `users/qualification_improvement/${id}`,
                    method: "PATCH",
                    body: formData,
                };
            },
        }),
    }),
});

export const {
    useGetQualificationsQuery,
    useGetQualificationsIdQuery,
    usePatchQualificationIdMutation,
} = qualifications;
