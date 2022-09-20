import { api } from '../api'

export const TestsBank = api.injectEndpoints({
    endpoints: (build) => ({
        //Банк тестов
        getAttestationsTestsBank: build.query({
            query: ({ currentPage, name, is_active, direction_name, id }) =>
                `constructor/unit/?name=${name}&is_active=${is_active}&direction_name=${direction_name}&page=${currentPage}&ordering=${id}`,
            providesTags: ['Attestation'],
        }),
        //создать новый тест
        postAttestationsTestsBank: build.mutation({
            query(body) {
                return {
                    url: `constructor/unit/`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'Attestation' }],
        }),
        //изменить баеу тестов
        patchAttestationsTestsBankId: build.mutation({
            query({ id, body }) {
                return {
                    url: `/constructor/unit/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: [{ type: 'Attestation' }],
        }),
        //изменить статус банка тестов
        putAttestationsTestsBankId: build.mutation({
            query({ id }) {
                return {
                    url: `/constructor/unit/${id}`,
                    method: 'PUT',
                }
            },
            invalidatesTags: [{ type: 'Attestation' }],
        }),
    }),
})

export const {
    usePostAttestationsTestsBankMutation,
    useGetAttestationsTestsBankQuery,
    usePatchAttestationsTestsBankIdMutation,
    usePutAttestationsTestsBankIdMutation,
} = TestsBank
