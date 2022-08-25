import { api } from './api'

export const attestationProtocol = api.injectEndpoints({
    endpoints: (build) => ({
        getAttestationProtocol: build.query({
            query: ({ group_type }) => `lpr/protocol/?group_type=${group_type}`,
            providesTags: ['AttestationProtocol'],
        }),
        getAttestationUsers: build.query({
            query: () => `lpr/user/`,
            providesTags: ['AttestationProtocol'],
        }),
        getAttestationUserId: build.query({
            query: ({ id }) => `lpr/user/${id}`,
            providesTags: ['AttestationProtocol'],
        }),
    }),
})

export const {
    useGetAttestationProtocolQuery,
    useGetAttestationUsersQuery,
    useGetAttestationUserIdQuery,
} = attestationProtocol
