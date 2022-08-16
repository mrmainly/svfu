import { api } from "./api";

export const profile = api.injectEndpoints({
    endpoints: (build) => ({
        getProfile: build.query({
            query({ cookie }) {
                return {
                    url: `users/me/`,
                    dependencies: cookie,
                };
            },
            providesTags: ["Profile"],
        }),
        profilePatch: build.mutation({
            query(body) {
                return {
                    url: `users/me/`,
                    method: "PATCH",
                    body,
                };
            },
            invalidatesTags: [{ type: "Profile" }],
        }),
        profilePostImage: build.mutation({
            query(body) {
                return {
                    url: `users/photo/`,
                    method: "POST",
                    body,
                };
            },
        }),
    }),
});

export const {
    useGetProfileQuery,
    useProfilePatchMutation,
    useProfilePostImageMutation,
} = profile;
