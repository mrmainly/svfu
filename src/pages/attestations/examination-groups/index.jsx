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
    const [testGroupId, setTestGroupId] = useState(null)

    const { data, isFetching } = useGetTestGroupQuery('')
    const { data: tester } = useGetTesterQuery('')
    const { data: direction } = useGetDirectionTuterQuery('')

    return (
        <div>
            <EgCreateModal
                open={open}
                setOpen={setOpen}
                tester={tester?.results}
                direction={direction?.results}
            />
            <EgEditModal
                open={openEditModal}
                setOpen={setOpenEditModal}
                tester={tester?.results}
                direction={direction?.results}
                id={testGroupId}
            />
            <MyButton style={{ marginBottom: 20 }} onClick={() => setOpen(true)}>
                Создать группу
            </MyButton>
            <ExaminationGroupsTable
                data={data?.results}
                loading={isFetching}
                setOpenEditModal={setOpenEditModal}
                setTestGroupId={setTestGroupId}
            />
        </div>
    )
}

export default ExaminationGroups
