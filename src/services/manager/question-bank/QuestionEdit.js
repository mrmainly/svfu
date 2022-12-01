import { api } from '../../api'

export const QuestionEdit = api.injectEndpoints({
    endpoints: (build) => ({
        getManagerQuestionEditId: build.query({
            query: ({ id }) => `constructor/question/${id}`,
            providesTags: ['ManagerConstructorQuestion'],
        }),
    }),
})

export const { useGetManagerQuestionEditIdQuery } = QuestionEdit
