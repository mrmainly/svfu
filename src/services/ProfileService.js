import { api } from './api'

export const profile = api.injectEndpoints({
    endpoints: (build) => ({
        getProfile: build.query({
            query() {
                return {
                    url: `users/me/`,
                }
            },
            async onQueryStarted(undefiend, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    window.localStorage.setItem('profile', JSON.stringify(data, null, '\t'))
                } catch (err) {
                    console.log(err)
                }
            },
            providesTags: ['Profile'],
        }),
        profilePatch: build.mutation({
            query(body) {
                return {
                    url: `users/me/`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: [{ type: 'Profile' }],
        }),
        profilePostPhoto: build.mutation({
            query(body) {
                return {
                    url: `users/photo/`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'Profile' }],
        }),
        profileDeletePhoto: build.mutation({
            query() {
                return {
                    url: `users/photo/`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [{ type: 'Profile' }],
        }),
    }),
})

export const {
    useGetProfileQuery,
    useProfilePatchMutation,
    useProfilePostPhotoMutation,
    useProfileDeletePhotoMutation,
} = profile
