import { api } from '../api'

export const TestsBank = api.injectEndpoints({
    endpoints: (build) => ({
        //Банк тестов
        // getAttestationsTestsBank: build.query({
        //     query: ({ currentPage, name, is_active, direction_name, id, unit_type }) =>
        //         `constructor/unit/?name=${name}&is_active=${is_active}&direction_name=${direction_name}&page=${currentPage}&ordering=${id}&unit_type=${unit_type}`,
        //     providesTags: ['Attestation'],
        // }),
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
        getSoftQuestionList: build.query({
            query: ({ direction, name }) => `constructor/question/soft/?direction=${direction}&name=${name}`,
            providesTags: ['SoftQuestion'],
        }),
        // postSoftTest: build.mutation({
        //     query(body) {
        //         return {
        //             url: `constructor/unit/soft/`,
        //             method: 'POST',
        //             body,
        //         }
        //     },
        //     invalidatesTags: [{ type: 'Attestation' }],
        // }),
        patchSoftTest: build.mutation({
            query({ body, id }) {
                return {
                    url: `constructor/unit/soft/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: [{ type: 'Attestation' }],
        }),

        //2.0
        getAttestationsTestsBank: build.query({
            query: ({ currentPage, name, is_active, direction_name, id, unit_type }) =>
                `constructor/unit?name=${name}&is_active=${is_active}&direction_name=${direction_name}&page=${currentPage}&ordering=${id}&unit_type=${unit_type}`,
            providesTags: ['Attestation'],
        }),
        getConstructorTestCreateQuestions: build.query({
            query: () =>
                `constructor/question?question_type=SOFT&page=1`,
            providesTags: ['ManagerConstructorQuestion'],
        }),
        postUnit: build.mutation({
            query(formData) {
                return {
                    url: `constructor/unit`,
                    method: 'POST',
                    body: formData,
                    header: 'multipart/form-data',
                }
            },
            invalidatesTags: [{ type: 'Attestation' }],
        }),
        postUnitSoft: build.mutation({
            query({ body, id }) {
                return {
                    url: `constructor/unit/${id}/soft`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'Attestation' }],
        }),
        postUnitSoftChapter: build.mutation({
            query({ body, id }) {
                return {
                    url: `constructor/unit/${id}/soft/chapter`,
                    method: 'POST',
                    body,
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
    useGetSoftQuestionListQuery,
    useGetConstructorTestCreateQuestionsQuery,
    usePostSoftTestMutation,
    usePatchSoftTestMutation,
    usePostUnitMutation,
    usePostUnitSoftMutation,
    usePostUnitSoftChapterMutation,
} = TestsBank
