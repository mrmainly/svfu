import { api } from '../api'

export const UserApplication = api.injectEndpoints({
    endpoints: (build) => ({
        //заявки пользователей
        getUserApplication: build.query({
            query: ({ currentPage, ordering, status, fullName, directionName, post }) =>
                `tutor/application/?page=${currentPage}&ordering=${ordering}&status=${status}&full_name=${fullName}&direction_name=${directionName}&post=${post}`,
            providesTags: ['Application'],
        }),
        //заявка пользователя + информация
        getUserApplicationId: build.query({
            query: (id) => `tutor/application/${id}`,
            providesTags: ['Application'],
        }),
        //подача заявления
        patchAcceptUserApplication: build.mutation({
            query({ body, id }) {
                return {
                    url: `tutor/application/${id}`,
                    method: 'PATCH',
                    body: body,
                }
            },
            invalidatesTags: [{ type: 'Application' }],
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
    }),
})

export const {
    useGetUserApplicationIdQuery,
    usePatchAcceptUserApplicationMutation,
    usePutUserApplicationRejectMutation,
    useGetUserApplicationQuery,
} = UserApplication
