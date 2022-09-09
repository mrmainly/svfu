import { api } from './api'

export const Admin = api.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => `admin/admin/users/`,
            providesTags: ['Admin'],
        }),
        getRole: build.query({
            query: ({ role }) => `admin/admin/users/?role=${role}`,
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
        patchExam: build.mutation({
            query({ id, body }) {
                return {
                    url: `admin/admin/exam/${id}`,
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

        getAdminExamID: build.query({
            query: ({ id }) => `admin/admin/exam/${id}`,
            providesTags: ['Admin'],
        }),

        //расписание экзаменов
        getAdminExam: build.query({
            query: ({ currentPage, unit, testGroup, testers, examStatus, ordering }) =>
                `admin/admin/exam/?page=${currentPage}&unit=${unit}&test_group=${testGroup}&testers=${testers}&exam_status=${examStatus}&ordering=${ordering}`,
            providesTags: ['Admin'],
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
    useGetRoleQuery,
    useGetUserIdQuery,
    usePostUserMutation,
    usePatchUserMutation,
    usePatchExamMutation,
    usePutUserMutation,
    useGetAdminExamIDQuery,

    //расписание экзаменов
    useGetAdminExamQuery,

    //пользователи
    useGetAdminUsersQuery,
} = Admin
