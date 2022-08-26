import React from 'react'

import AvailableTestTable from './components/tables/AvailableTestTable'
import { useGetSurveysQuery } from '../../services/SurveysService'

const Test = () => {
    const { data, isLoading } = useGetSurveysQuery('')

    console.log(data)

    return (
        <div>
            <AvailableTestTable data={data?.results} loading={isLoading} />
        </div>
    )
}

export default Test
