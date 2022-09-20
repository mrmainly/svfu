import { api } from '../api'

export const LprExamList = api.injectEndpoints({
    endpoints: (build) => ({
        //Расписание экзаменов
        getLprExamList: build.query({
            query: ({ unit, order, currentPage, status }) =>
                `lpr/exam/?page=${currentPage}&ordering=${order}&unit=${unit}&exam_status=${status}`,
            providesTags: ['AttestationProtocol'],
        }),
    }),
})

export const { useGetLprExamListQuery } = LprExamList
