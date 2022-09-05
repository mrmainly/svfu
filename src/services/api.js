import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import cookie from 'js-cookie'

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://notalone.medic.fun/api/v1/',
    prepareHeaders: (headers, { getState }) => {
        const token = cookie.get('token')
        if (token) {
            headers.set('authorization', `Token ${token}`)
        }
        return headers
    },
})

// const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const api = createApi({
    reducerPath: 'splitApi',

    baseQuery: baseQuery,

    tagTypes: [
        'Profile',
        'Qualification',
        'Document',
        'Direction',
        'Attestation',
        'TestProcessing',
        'TestGroup',
        'AttestationProtocol',
        'Admin',
        'Appeal',
        'ModeratorAppeal',
        'TestResult',
        'LprUser',
        'AdminUser',
        'SURVEYS_TESTER',
    ],

    endpoints: () => ({}),
})
