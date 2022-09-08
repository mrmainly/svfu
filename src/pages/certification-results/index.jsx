import React from 'react'

import CerificationResultsTable from './components/tables/CerificationResultsTable'

import { useGetTestResultsQuery } from '../../services/SurveysService'
import ROUTES from '../../routes'

const Test = () => {
    const { data, isFetching } = useGetTestResultsQuery('')

    return (
        <div>
            <CerificationResultsTable
                data={data?.results}
                routes={ROUTES.CERTIFICATION_RESULTS_DETAIL}
                loading={isFetching}
            />
        </div>
    )
}

export default Test
