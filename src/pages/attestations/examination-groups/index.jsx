import React from 'react'

import { MyButton } from '../../../components'
import ExaminationGroupsTable from '../components/tables/ExaminationGroupsTable'
import { useGetTestGroupQuery } from '../../../services/TestGroup'

const ExaminationGroups = () => {
    const { data, isFetching } = useGetTestGroupQuery('')

    console.log(data)

    return (
        <div>
            <MyButton style={{ marginBottom: 20 }}>Создать группу</MyButton>
            <ExaminationGroupsTable data={data} loading={isFetching} />
        </div>
    )
}

export default ExaminationGroups
