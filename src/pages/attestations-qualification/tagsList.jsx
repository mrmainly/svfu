import React, { useState } from 'react'

import { MyButton } from '../../components'
import TagsTable from './compoents/table/TagsTable'
import { useGetAttestationsTagQuery } from '../../services/AttestationService'
import TagsAddModal from './compoents/modals/TagsAddModal'
import TagsEditModal from './compoents/modals/TagsEditModal'
import { useModal } from '../../hooks'

const TagsList = () => {
    const [currentData, setCurrentData] = useState({})
    const [openEditModal, setOpenEditModal] = useState(false)

    const { data, isFetching } = useGetAttestationsTagQuery('')
    const { open, handleClose, handleOpen } = useModal()

    const handleEditModalClose = () => {
        setOpenEditModal(false)
    }

    const handleEditModalOpen = () => {
        setOpenEditModal(true)
    }

    return (
        <div>
            <TagsAddModal open={open} handleClose={handleClose} />
            <TagsEditModal
                data={currentData}
                handleClose={handleEditModalClose}
                open={openEditModal}
            />
            <MyButton style={{ marginBottom: 20 }} onClick={handleOpen}>
                Создание тегов
            </MyButton>
            <TagsTable
                data={data?.results}
                loading={isFetching}
                setCurrentData={setCurrentData}
                handleOpen={handleEditModalOpen}
            />
        </div>
    )
}

export default TagsList
