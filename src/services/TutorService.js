import { api } from './api'

export const Tutor = api.injectEndpoints({
    endpoints: (build) => ({
        //аттестуемые
        getCertified: build.query({
            query: ({ currentPage, ordering, fullName, application }) =>
                `tutor/tester?page=${currentPage}&ordering=${ordering}&full_name=${fullName}&application=${application}`,
        }),
        //аттестуемый
        getCertifiedId: build.query({
            query: ({ id }) => `tutor/tester/${id}`,
        }),

        //заявки пользователей
        getUserApplication: build.query({
            query: ({ currentPage, ordering, status, fullName, directionName, post }) =>
                `tutor/application/?page=${currentPage}&ordering=${ordering}&status=${status}&full_name=${fullName}&direction_name=${directionName}&post=${post}`,
        }),
        //заявка пользователя + информация
        getUserApplicationId: build.query({
            query: (id) => `tutor/application/${id}`,
            providesTags: ['Application'],
        }),
        //подача заявления
        postAcceptUserApplication: build.mutation({
            query({ id }) {
                return {
                    url: `tutor/application/${id}`,
                    method: 'POST',
                }
            },
            invalidatesTags: [{ type: 'Application' }],
        }),
        //получение имени и id пользлователя
        getUserId: build.query({
            query: ({ id }) => `tutor/application/user/?direction=${id}`,
        }),
        //отколнение заявления
        putUserApplicationReject: build.mutation({
            query({ id, data }) {
                return {
                    url: `tutor/application/${id}`,
                    method: 'PUT',
                    body: data,
                }
            },
            invalidatesTags: [{ type: 'Application' }],
        }),

        //экзаменационные группы
        getExaminationGroups: build.query({
            query: ({ currentPage, ordering, examStatus, directionName }) =>
                `tutor/testgroup?page=${currentPage}&ordering=${ordering}&direction_name=${directionName}&exam_status=${examStatus}`,
            providesTags: ['ExaminationGroups'],
        }),
        //создание экзаменационной группы
        postExaminationGroups: build.mutation({
            query(body) {
                return {
                    url: `tutor/testgroup`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'ExaminationGroups' }],
        }),
        //изменение экзаменационной группы
        patchExaminationGroups: build.mutation({
            query({ body, id }) {
                return {
                    url: `tutor/testgroup/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: [{ type: 'ExaminationGroups' }],
        }),
        //удаление экзаменационной группы
        deleteExaminationGroups: build.mutation({
            query(id) {
                return {
                    url: `tutor/testgroup/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: [{ type: 'ExaminationGroups' }],
        }),

        //расписание экзаменов
        getExamSchedule: build.query({
            query: ({ currentPage, unit, testGroup, testers, examStatus, ordering }) =>
                `tutor/exam?page=${currentPage}&unit=${unit}&test_group=${testGroup}&testers=${testers}&exam_status=${examStatus}&ordering=${ordering}`,
            providesTags: ['ExamSchedule'],
        }),
        //создание расписание экзаменов
        postExamSchedule: build.mutation({
            query(body) {
                return {
                    url: `tutor/exam`,
                    method: 'POST',
                    body,
                }
            },
            invalidatesTags: [{ type: 'ExamSchedule' }],
        }),
        //кфалификация
        getDirectionTuter: build.query({
            query: () => `tutor/direction`,
        }),
        //список групп аттестуемых
        getExaminationGroupsDirection: build.query({
            query: ({ direction }) => `tutor/testgroup?direction=${direction}`,
            providesTags: ['ExamSchedule'],
        }),
        //выбор тестирование
        getTestingId: build.query({
            query: ({ id }) => `tutor/unit/${id}`,
        }),
        //изменение расписание экзамена
        patchExamSchedule: build.mutation({
            query({ id, body }) {
                return {
                    url: `tutor/exam/${id}`,
                    method: 'PATCH',
                    body,
                }
            },
            invalidatesTags: [{ type: 'ExamSchedule' }],
        }),
        //список тестирования
        getTestingList: build.query({
            query: ({ direction }) => `tutor/unit?direction=${direction}`,
            providesTags: ['ExamSchedule'],
        }),
        //роль поьзователя
        getUsersRole: build.query({
            query: ({ role }) => ({
                url: `tutor/users?role=${role}`,
                dependencies: role,
            }),
            providesTags: ['ExamSchedule'],
        }),
        //удаление группы аттестуемых
        deleteExamSchedule: build.mutation({
            query({ id, data }) {
                return {
                    url: `tutor/exam/${id}`,
                    method: 'DELETE',
                    body: data,
                }
            },
            invalidatesTags: [{ type: 'ExamSchedule' }],
        }),
    }),
})

export const {
    useGetExaminationGroupsDirectionQuery,
    useGetTestingListQuery,
    useGetDirectionTuterQuery,
    usePostExaminationGroupsMutation,
    usePostExamScheduleMutation,
    usePatchExaminationGroupsMutation,
    useDeleteExaminationGroupsMutation,
    useGetUserApplicationIdQuery,
    useDeleteExamScheduleMutation,
    usePatchExamScheduleMutation,
    useGetUsersRoleQuery,
    useGetCertifiedIdQuery,
    usePostAcceptUserApplicationMutation,
    usePutUserApplicationRejectMutation,
    useGetUserIdQuery,
    useGetTestingIdQuery,
    useGetCertifiedQuery,
    useGetUserApplicationQuery,
    useGetExaminationGroupsQuery,
    useGetExamScheduleQuery,
} = Tutor
