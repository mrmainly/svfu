import { api } from "./api";

export const profile = api.injectEndpoints({
    endpoints: (build) => ({
        getProfile: build.query({
            query: () => `users/me/`,
        }),
        profilePatch: build.mutation({
            query(body) {
                return {
                    url: `users/me/`,
                    method: "PATCH",
                    body,
                };
            },
        }),
    }),
});

export const { useGetProfileQuery, useProfilePatchMutation } = profile;
