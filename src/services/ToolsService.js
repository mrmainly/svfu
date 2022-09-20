import { api } from './api'

export const tools = api.injectEndpoints({
    endpoints: (build) => ({
        getToolsDirection: build.query({
            query: () => `/tools/directions/`,
        }),
        //проверка кода
        sendCode: build.mutation({
            query({ code }) {
                return {
                    url: `tools/signature/${code}`,
                    method: 'POST',
                }
            },
            invalidatesTags: [{ type: 'TestProcessing' }],
        }),
    }),
})

export const { useGetToolsDirectionQuery, useSendCodeMutation } = tools
