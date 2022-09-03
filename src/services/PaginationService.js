import { api } from './api'

export const pagination = api.injectEndpoints({
    endpoints: (build) => ({
        getTestProcessing: build.query({
            query: ({ currentPage }) => `expert/result/?page=${currentPage}`,
            providesTags: ['TestProcessing'],
        }),
        getTestResult: build.query({
            query: ({ currentPage }) => `moderator/result/?page=${currentPage}`,
            providesTags: ['TestResult'],
        }),
        getLprUser: build.query({
            query: ({ currentPage }) => `lpr/user/?page=${currentPage}`,
            providesTags: ['LprUser'],
        }),
        getAdminUser: build.query({
            query: ({ currentPage }) => `admin/admin/users/?page=${currentPage}`,
            providesTags: ['AdminUser'],
        }),
    }),
})

export const {
    useGetTestProcessingQuery,
    useGetTestResultQuery,
    useGetLprUserQuery,
    useGetAdminUserQuery,
} = pagination
