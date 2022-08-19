import { api } from './api'
import { SurveysSlice } from '../reducers/SurveysSlice'

const { getData } = SurveysSlice.actions

export const testgroup = api.injectEndpoints({
    endpoints: (build) => ({
        getTestGroup: build.query({
            query: () => `tutor/testgroup`,
        }),
    }),
})

export const { useGetTestGroupQuery } = testgroup
