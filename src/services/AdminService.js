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
            invalidatesTags: [{ type: 'AdminUser' }],
        }),
        patchUser: build.mutation({
            query({ id, body }) {
                return {
                    url: `admin/admin/users/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: [{ type: 'AdminUser' }],
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

        //пользователи
        getAdminUsers: build.query({
            query: ({ currentPage, role, ordering, fullName, application, isActive }) =>
                `admin/admin/users/?page=${currentPage}&role=${role}&ordering=${ordering}&full_name=${fullName}&application=${application}&is_active=${isActive}`,
            providesTags: ['AdminUser'],
        }),
    }),
})

export const {
    useGetUsersQuery,

    useGetUserIdQuery,
    usePostUserMutation,
    usePatchUserMutation,

    usePutUserMutation,

    //расписание экзаменов

    //пользователи
    useGetAdminUsersQuery,
} = Admin
