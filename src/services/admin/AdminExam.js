import { api } from '../api'

export const AdminExam = api.injectEndpoints({
    endpoints: (build) => ({
        //список расписание экзаменов
        getAdminExam: build.query({
            query: ({ currentPage, unit, testGroup, testers, examStatus, ordering }) =>
                `admin/admin/exam/?page=${currentPage}&unit=${unit}&test_group=${testGroup}&testers=${testers}&exam_status=${examStatus}&ordering=${ordering}`,
            providesTags: ['Admin'],
        }),
        //расписание экзаменов
        getAdminExamID: build.query({
            query: ({ id }) => `admin/admin/exam/${id}`,
            providesTags: ['Admin'],
        }),
        //роль пользователя
        getUserRole: build.query({
            query: ({ role }) => `admin/admin/users/?role=${role}`,
            // providesTags: ['Admin'],
        }),
        //изменение расписание экзаменов
        patchAdminExam: build.mutation({
            query({ id, body }) {
                return {
                    url: `admin/admin/exam/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: [{ type: 'Admin' }],
        }),
    }),
})

export const {
    useGetUserRoleQuery,
    usePatchAdminExamMutation,
    useGetAdminExamIDQuery,
    useGetAdminExamQuery,
} = AdminExam
