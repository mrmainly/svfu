import React from 'react'

import AvailableTestTable from './components/tables/AvailableTestTable'
import { useGetSurveysQuery } from '../../services/SurveysService'

const Test = () => {
    const { data, isLoading } = useGetSurveysQuery('')

    return (
        <div>
            <AvailableTestTable data={data?.results} loading={isLoading} />
        </div>
    )
}

export default Test
