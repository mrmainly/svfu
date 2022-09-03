import { api } from './api'

export const Tutor = api.injectEndpoints({
    endpoints: (build) => ({
        getTestGroup: build.query({
            query: ({ currentPage }) => `tutor/testgroup?page=${currentPage}`,
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
            query: () => `tutor/unit`,
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
        // getApplication: build.query({
        //     query: () => `tutor/application/`,
        // }),
        getApplicationId: build.query({
            query: (id) => `tutor/application/${id}`,
        }),
        // getTester: build.query({
        //     query: () => `tutor/tester`,
        // }),
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
    }),
})

export const {
    useGetTestGroupQuery,
    useGetUnitQuery,
    useGetDirectionTuterQuery,
    useGetTestGroupIdQuery,
    // useGetApplicationQuery,
    // useGetTesterQuery,
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
} = Tutor
