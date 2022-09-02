import React, { useState } from 'react'

import { MyButton } from '../../../components'
import ExaminationGroupsTable from '../components/tables/ExaminationGroupsTable'
import {
    useGetTestGroupQuery,
    useGetDirectionTuterQuery,
    useGetTestGroupIdQuery,
    useGetTesterQuery,
} from '../../../services/TutorService'
import EgCreateModal from '../components/modals/egCreateModal'
import EgEditModal from '../components/modals/egEditModal'

const ExaminationGroups = () => {
    const [open, setOpen] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [testGroup, setTestGroup] = useState()

    const { data, isFetching } = useGetTestGroupQuery('')
    const { data: direction } = useGetDirectionTuterQuery('')

    return (
        <div>
            <EgCreateModal open={open} setOpen={setOpen} direction={direction?.results} />
            <EgEditModal
                open={openEditModal}
                setOpen={setOpenEditModal}
                direction={direction?.results}
                testGroup={testGroup}
            />
            <MyButton style={{ marginBottom: 20 }} onClick={() => setOpen(true)}>
                Создать группу
            </MyButton>
            <ExaminationGroupsTable
                data={data?.results}
                loading={isFetching}
                setOpenEditModal={setOpenEditModal}
                setTestGroup={setTestGroup}
            />
        </div>
    )
}

export default ExaminationGroups
