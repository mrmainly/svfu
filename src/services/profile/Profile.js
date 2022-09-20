import { api } from '../api'

export const Profile = api.injectEndpoints({
    endpoints: (build) => ({
        //профиль
        getProfile: build.query({
            query() {
                return {
                    url: `users/me/`,
                }
            },
            async onQueryStarted(undefiend, { queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    window.localStorage.setItem('profile', JSON.stringify(data, null, '\t'))
                } catch (err) {
                    console.log(err)
                }
            },
            providesTags: ['Profile'],
        }),
        //изменение профиля
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
        //добавление фото
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
        //удаление фото
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
} = Profile
