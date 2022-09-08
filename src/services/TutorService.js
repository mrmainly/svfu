import { api } from './api'

export const Tutor = api.injectEndpoints({
    endpoints: (build) => ({
        getTestGroup: build.query({
            query: ({ currentPage }) => `tutor/testgroup?page=${currentPage}`,
            providesTags: ['TestGroup'],
        }),
        getTestGroupDirection: build.query({
            query: ({ direction }) => `tutor/testgroup?direction=${direction}`,
            providesTags: ['TestGroup'],
        }),
        getTestExam: build.query({
            query: ({ currentPage }) => `tutor/exam?page=${currentPage}`,
            providesTags: ['TestGroup'],
        }),
        patchTestExam: build.mutation({
            query({ id, body }) {
                return {
                    url: `tutor/exam/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: [{ type: 'TestGroup' }],
        }),
        getUnit: build.query({
            query: ({ direction }) => `tutor/unit?direction=${direction}`,
            providesTags: ['TestGroup'],
        }),
        getTestGroupId: build.query({
            query: (id) => ({
                url: `tutor/testgroup/${id}`,
                dependencies: id,
            }),
            providesTags: ['TestGroup'],
        }),
        postTesterGroup: build.mutation({
            query(body) {
                return {
                    url: `tutor/testgroup`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'TestGroup' }],
        }),
        patchTesterGroup: build.mutation({
            query({ body, id }) {
                return {
                    url: `tutor/testgroup/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: [{ type: 'TestGroup' }],
        }),
        deleteTesterGroup: build.mutation({
            query(id) {
                return {
                    url: `tutor/testgroup/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [{ type: 'TestGroup' }],
        }),
        getDirectionTuter: build.query({
            query: () => `tutor/direction`,
        }),

        getApplicationId: build.query({
            query: (id) => `tutor/application/${id}`,
            providesTags: ['Application'],
        }),

        getUsersRole: build.query({
            query: ({ role }) => ({
                url: `tutor/users?role=${role}`,
                dependencies: role,
            }),
            providesTags: ['TestGroup'],
        }),
        postTestExam: build.mutation({
            query(body) {
                return {
                    url: `tutor/exam`,
                    method: 'POST',
                    body,
                }
            },
        }),
        postAcceptApplication: build.mutation({
            query({ id }) {
                return {
                    url: `tutor/application/${id}`,
                    method: 'POST',
                }
            },
            invalidatesTags: [{ type: 'Application' }],
        }),
        putUserApplicationReject: build.mutation({
            query({ id, data }) {
                return {
                    url: `tutor/application/${id}`,
                    method: 'PUT',
                    body: data,
                }
            },
        }),
        getCertifiedId: build.query({
            query: ({ id }) => `tutor/tester/${id}`,
        }),
        getApplicationUser: build.query({
            query: ({ id }) => `tutor/application/user/?direction=${id}`,
        }),
        getUnitId: build.query({
            query: ({ id }) => `tutor/unit/${id}`,
        }),

        //аттестуемые
        getTutorTester: build.query({
            query: ({ currentPage, ordering, fullName, application }) =>
                `tutor/tester?page=${currentPage}&ordering=${ordering}&full_name=${fullName}&application=${application}`,
        }),

        //заявки пользователей
        getTutorApplication: build.query({
            query: ({ currentPage, ordering, status, fullName, directionName, post }) =>
                `tutor/application/?page=${currentPage}&ordering=${ordering}&status=${status}&full_name=${fullName}&direction_name=${directionName}&post=${post}`,
        }),
    }),
})

export const {
    useGetTestGroupQuery,
    useGetTestGroupDirectionQuery,
    useGetUnitQuery,
    useGetDirectionTuterQuery,
    useGetTestGroupIdQuery,
    usePostTesterGroupMutation,
    usePostTestExamMutation,
    usePatchTesterGroupMutation,
    useDeleteTesterGroupMutation,
    useGetApplicationIdQuery,
    useGetTestExamQuery,
    usePatchTestExamMutation,
    useGetUsersRoleQuery,
    useGetCertifiedIdQuery,
    usePostAcceptApplicationMutation,
    usePutUserApplicationRejectMutation,
    useGetApplicationUserQuery,
    useGetUnitIdQuery,

    //аттестуемые
    useGetTutorTesterQuery,

    //заявки пользователей
    useGetTutorApplicationQuery,
} = Tutor
