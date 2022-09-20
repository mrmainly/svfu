import { api } from '../api'

export const LprUsers = api.injectEndpoints({
    endpoints: (build) => ({
        //Пользователи
        getLprUser: build.query({
            query: ({ id, role, currentPage, name }) =>
                `lpr/user/?full_name=${name}&page=${currentPage}&ordering=${id}&role=${role}`,
            providesTags: ['AttestationProtocol'],
        }),
        //пользователь
        getLprUserId: build.query({
            query: ({ id }) => `lpr/user/${id}`,
            providesTags: ['AttestationProtocol'],
        }),
    }),
})

export const { useGetLprUserQuery, useGetLprUserIdQuery } = LprUsers
