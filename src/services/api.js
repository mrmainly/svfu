import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import cookie from 'js-cookie'

// process.env.REACT_APP_API_KEY

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://84.252.138.134:8543/api/v1/',
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
        'SoftQuestion',
        //tutor экзаменационные группы
        'ExaminationGroups ',
        //tutor расписание экзаменов
        'ExamSchedule',

        //мои квалификации
        'Qualification',
        //мои документы
    ],

    endpoints: () => ({}),
})
