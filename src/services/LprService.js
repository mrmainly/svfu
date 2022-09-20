import { api } from './api'

export const lprService = api.injectEndpoints({
    endpoints: (build) => ({
        //Расписание экзаменов
        getLprExamList: build.query({
            query: ({ unit, order, currentPage, status }) =>
                `lpr/exam/?page=${currentPage}&ordering=${order}&unit=${unit}&exam_status=${status}`,
            providesTags: ['AttestationProtocol'],
        }),
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
        //Аттестационные протоколы
        getAttestationProtocol: build.query({
            query: ({ type, group_type, currentPage, id }) =>
                `lpr/protocol/?type=${type}&group_type=${group_type}&ordering=${id}&page=${currentPage}`,
            providesTags: ['AttestationProtocol'],
        }),
    }),
})

export const {
    useGetLprExamListQuery,
    useGetLprUserQuery,
    useGetAttestationProtocolQuery,
    useGetLprUserIdQuery,
} = lprService
