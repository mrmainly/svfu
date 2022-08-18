import React from 'react'

import CerificationResultsTable from './components/tables/CerificationResultsTable'

import { useGetTestResultsQuery } from '../../services/SurveysService'
import ROUTES from '../../routes'

const Test = () => {
    const { data, isFetching, error } = useGetTestResultsQuery('')

    // const data = [
    //     {
    //         qualification: 'Название_квалификации',
    //         date: '20.08.2022, 14:00',
    //         id: 1,
    //         status: 'Не проверено',
    //         time: '1 час 30 минут',
    //         points: 25,
    //     },
    // ]

    return (
        <div>
            <CerificationResultsTable
                data={data}
                routes={ROUTES.CERTIFICATION_RESULTS_DETAIL}
                loading={isFetching}
            />
        </div>
    )
}

export default Test
