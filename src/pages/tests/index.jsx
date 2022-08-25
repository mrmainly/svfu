import React from 'react'

import AvailableTestTable from './components/tables/AvailableTestTable'
import { useGetSurveysQuery } from '../../services/SurveysService'
import ROUTES from '../../routes'

const Test = () => {
    const { data, isLoading } = useGetSurveysQuery('')

    console.log(data)

    return (
        <div>
            <AvailableTestTable
                data={data?.results}
                routes={ROUTES.TEST_DETAIL}
                loading={isLoading}
            />
        </div>
    )
}

export default Test
