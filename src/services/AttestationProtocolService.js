import { api } from './api'

export const attestationProtocol = api.injectEndpoints({
    endpoints: (build) => ({
        getAttestationProtocol: build.query({
            query: ({ group_type, currentPage }) =>
                `lpr/protocol/?group_type=${group_type}&page=${currentPage}`,
            providesTags: ['AttestationProtocol'],
        }),
        getAttestationUsers: build.query({
            query: ({ currentPage }) => `lpr/user/?page=${currentPage}`,
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
