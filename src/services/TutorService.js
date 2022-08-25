import { api } from './api'
import { SurveysSlice } from '../reducers/SurveysSlice'

const { getData } = SurveysSlice.actions

export const Tutor = api.injectEndpoints({
    endpoints: (build) => ({
        getTestGroup: build.query({
            query: () => `tutor/testgroup`,
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
        getApplication: build.query({
            query: () => `tutor/application/`,
        }),
        getApplicationId: build.query({
            query: (id) => `tutor/application/${id}`,
        }),
        getTester: build.query({
            query: () => `tutor/tester`,
        }),
    }),
})

export const {
    useGetTestGroupQuery,
    useGetDirectionTuterQuery,
    useGetTestGroupIdQuery,
    useGetApplicationQuery,
    useGetTesterQuery,
    usePostTesterGroupMutation,
    usePatchTesterGroupMutation,
    useDeleteTesterGroupMutation,
    useGetApplicationIdQuery,
} = Tutor
