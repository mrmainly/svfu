import { api } from '../api'

export const AttestationProtocol = api.injectEndpoints({
    endpoints: (build) => ({
        //Аттестационные протоколы
        getAttestationProtocol: build.query({
            query: ({ type, group_type, currentPage, id }) =>
                `lpr/protocol/?type=${type}&group_type=${group_type}&ordering=${id}&page=${currentPage}`,
            providesTags: ['AttestationProtocol'],
        }),
    }),
})

export const { useGetAttestationProtocolQuery } = AttestationProtocol
