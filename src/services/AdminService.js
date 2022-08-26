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
        getAdminExamList: build.query({
            query: () => `lpr/exam/`,
            providesTags: ['Admin'],
        }),
    }),
})

export const { useGetUsersQuery, useGetUserIdQuery, useGetLprExamListQuery } = Admin
