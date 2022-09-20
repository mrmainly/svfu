import { api } from '../api'

export const ExaminationGroups = api.injectEndpoints({
    endpoints: (build) => ({
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
    }),
})

export const {
    usePostExaminationGroupsMutation,
    usePatchExaminationGroupsMutation,
    useDeleteExaminationGroupsMutation,
    useGetExaminationGroupsQuery,
} = ExaminationGroups
