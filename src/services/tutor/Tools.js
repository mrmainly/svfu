import { api } from '../api'

export const Tools = api.injectEndpoints({
    endpoints: (build) => ({
        //получение имени и id пользлователя
        getUserId: build.query({
            query: ({ id }) => `tutor/application/user/?direction=${id}`,
        }),
        //кфалификация
        getDirectionTuter: build.query({
            query: () => `tutor/direction`,
        }),
    }),
})

export const { useGetUserIdQuery, useGetDirectionTuterQuery } = Tools
