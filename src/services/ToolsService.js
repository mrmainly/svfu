import { api } from './api'

export const tools = api.injectEndpoints({
    endpoints: (build) => ({
        getToolsDirection: build.query({
            query: () => `/tools/directions/`,
        }),
    }),
})

export const { useGetToolsDirectionQuery } = tools
