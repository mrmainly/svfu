import { api } from '../api'

export const AdminUsers = api.injectEndpoints({
    endpoints: (build) => ({
        //пользователи
        getAdminUsers: build.query({
            query: ({ currentPage, role, ordering, fullName, application, isActive }) =>
                `admin/admin/users/?page=${currentPage}&role=${role}&ordering=${ordering}&full_name=${fullName}&application=${application}&is_active=${isActive}`,
            providesTags: ['AdminUser'],
        }),
        //пользователь
        getUserId: build.query({
            query: ({ id }) => `admin/admin/users/${id}`,
            providesTags: ['Admin'],
        }),
        //создание пользователя
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
        //редактирование пользователя
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
        //заблокировать пользователя
        putUser: build.mutation({
            query({ id }) {
                return {
                    url: `admin/admin/users/${id}`,
                    method: 'PUT',
                }
            },
            invalidatesTags: [{ type: 'Admin' }],
        }),
    }),
})

export const {
    useGetAdminUsersQuery,
    useGetUserIdQuery,
    usePostUserMutation,
    usePatchUserMutation,
    usePutUserMutation,
} = AdminUsers
