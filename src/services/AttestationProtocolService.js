import { api } from './api'

export const attestationProtocol = api.injectEndpoints({
    endpoints: (build) => ({
        getAttestationProtocol: build.query({
            query: ({ type, group_type, currentPage }) =>
                `lpr/protocol/?type=${type}&group_type=${group_type}&ordering=id&page=${currentPage}`,
            providesTags: ['AttestationProtocol'],
        }),
        getAttestationUsers: build.query({
            query: ({ id, role, currentPage, name }) =>
                `lpr/user/?full_name=${name}&page=${currentPage}&ordering=${id}&role=${role}`,
            providesTags: ['AttestationProtocol'],
        }),
        getAttestationUserId: build.query({
            query: ({ id }) => `lpr/user/${id}`,
            providesTags: ['AttestationProtocol'],
        }),
        getLprExamList: build.query({
            query: ({ currentPage }) => `lpr/exam/?page=${currentPage}`,
            providesTags: ['AttestationProtocol'],
        }),
    }),
})

export const {
    useGetAttestationProtocolQuery,
    useGetAttestationUsersQuery,
    useGetAttestationUserIdQuery,
    useGetLprExamListQuery,
} = attestationProtocol
