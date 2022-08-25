import { api } from './api'
import { SurveysSlice } from '../reducers/SurveysSlice'

const { getData } = SurveysSlice.actions

export const Tutor = api.injectEndpoints({
    endpoints: (build) => ({
        getTestGroup: build.query({
            query: () => `tutor/testgroup`,
        }),
        getDirection: build.query({
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
    useGetDirectionQuery,
    useGetApplicationQuery,
    useGetTesterQuery,
} = Tutor
