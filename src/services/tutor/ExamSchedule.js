import { api } from '../api'

export const ExamSchedule = api.injectEndpoints({
    endpoints: (build) => ({
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
    usePostExamScheduleMutation,
    useDeleteExamScheduleMutation,
    usePatchExamScheduleMutation,
    useGetUsersRoleQuery,
    useGetTestingIdQuery,
    useGetExamScheduleQuery,
} = ExamSchedule
