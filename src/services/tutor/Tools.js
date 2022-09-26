import { api } from '../api'

export const Tools = api.injectEndpoints({
    endpoints: (build) => ({
        //получение имени и id пользлователя
        getUserId: build.query({
            query: ({ id, full_name }) =>
                `tutor/application/user/?direction=${id}&full_name=${full_name}`,
        }),
        //кфалификация
        getDirectionTuter: build.query({
            query: () => `tutor/direction`,
        }),
    }),
})

export const { useGetUserIdQuery, useGetDirectionTuterQuery } = Tools
