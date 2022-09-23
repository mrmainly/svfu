import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import cookie from 'js-cookie'

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_KEY,
    prepareHeaders: (headers) => {
        const token = cookie.get('token')
        if (token) {
            headers.set('authorization', `Token ${token}`)
        }
        return headers
    },
})

export const api = createApi({
    reducerPath: 'splitApi',

    baseQuery: baseQuery,

    tagTypes: [
        'Profile',
        'Qualification',
        'Document',
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
        'Application',
        //tester
        'Applying',
        'SURVEYS_TESTER',
        //manager
        'ManagerConstructorQuestion',
        //tutor экзаменационные группы
        'ExaminationGroups ',
        //tutor расписание экзаменов
        'ExamSchedule',
    ],

    endpoints: () => ({}),
})
