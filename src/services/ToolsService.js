import { api } from './api'

export const tools = api.injectEndpoints({
    endpoints: (build) => ({
        getToolsDirection: build.query({
            query: () => `/tools/tools/direction/`,
            providesTags: ['Attestation'],
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
