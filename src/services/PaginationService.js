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
        getAppeal: build.query({
            query: ({ currentPage }) => `moderator/appeal/?page=${currentPage}`,
            providesTags: ['ModeratorAppeal'],
        }),
        getDirection: build.query({
            query: ({ currentPage }) => `tester/direction/?page=${currentPage}`,
            providesTags: ['Direction'],
        }),
        getSurveys: build.query({
            query: ({ currentPage }) => `tester/survey/?page=${currentPage}`,
        }),
        getTester: build.query({
            query: ({ currentPage }) => `tutor/tester?page=${currentPage}`,
        }),
        getApplication: build.query({
            query: ({ currentPage }) => `tutor/application/?page=${currentPage}`,
        }),
    }),
})

export const {
    useGetTestProcessingQuery,
    useGetTestResultQuery,
    useGetLprUserQuery,
    useGetAdminUserQuery,
    useGetAppealQuery,
    useGetDirectionQuery,
    useGetSurveysQuery,
    useGetTesterQuery,
    useGetApplicationQuery,
} = pagination
