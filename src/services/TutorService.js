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

        getDirectionTuter: build.query({
            query: () => `tutor/direction`,
        }),
        getApplication: build.query({
            query: () => `tutor/application/`,
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
} = Tutor
