import { api } from './api'

export const Admin = api.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => `admin/admin/users/`,
            providesTags: ['Admin'],
        }),
        getUserId: build.query({
            query: ({ id }) => `admin/admin/users/${id}`,
            providesTags: ['Admin'],
        }),
        postUser: build.mutation({
            query({ body }) {
                return {
                    url: `admin/admin/users/`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'Admin' }],
        }),
        patchUser: build.mutation({
            query({ id, body }) {
                return {
                    url: `admin/admin/users/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: [{ type: 'Admin' }],
        }),
        putUser: build.mutation({
            query({ id }) {
                return {
                    url: `admin/admin/users/${id}`,
                    method: 'PUT',
                }
            },
            invalidatesTags: [{ type: 'Admin' }],
        }),
        getAdminExam: build.query({
            query: () => `admin/admin/exam/`,
            providesTags: ['Admin'],
        }),
    }),
})

export const {
    useGetUsersQuery,
    useGetUserIdQuery,
    usePostUserMutation,
    usePatchUserMutation,
    usePutUserMutation,
    useGetAdminExamQuery,
} = Admin
