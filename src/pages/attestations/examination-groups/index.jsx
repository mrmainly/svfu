import React, { useState } from 'react'

import { MyButton } from '../../../components'
import ExaminationGroupsTable from '../components/tables/ExaminationGroupsTable'
import { useGetTestGroupQuery } from '../../../services/TutorService'
import EgCreateModal from '../components/modals/egCreateModal'

const ExaminationGroups = () => {
    const [open, setOpen] = useState(false)

    const { data, isFetching } = useGetTestGroupQuery('')

    return (
        <div>
            <EgCreateModal open={open} setOpen={setOpen} />
            <MyButton style={{ marginBottom: 20 }} onClick={() => setOpen(true)}>
                Создать группу
            </MyButton>
            <ExaminationGroupsTable data={data?.results} loading={isFetching} />
        </div>
    )
}

export default ExaminationGroups
