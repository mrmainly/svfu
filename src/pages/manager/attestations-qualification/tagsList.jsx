import React, { useState, useEffect } from 'react'
import { Input, Pagination } from 'antd'

import { MyButton } from '../../../components'
import TagsTable from './compoents/table/TagsTable'
import { useGetAttestationsTagQuery } from '../../../services/manager/Tags'
import TagsAddModal from './compoents/modals/TagsAddModal'
import TagsEditModal from './compoents/modals/TagsEditModal'
import { useModal } from '../../../hooks'
import './attestations-qualification.css'

const TagsList = () => {
    const [currentData, setCurrentData] = useState({})
    const [openEditModal, setOpenEditModal] = useState(false)
    const [name, setName] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const [id, setId] = useState('')

    const { data, isFetching } = useGetAttestationsTagQuery({
        currentPage: currentPage,
        name: name,
        ordering: id,
    })
    const { open, handleClose, handleOpen } = useModal()

    const handleEditModalClose = () => {
        setOpenEditModal(false)
    }

    const handleEditModalOpen = () => {
        setOpenEditModal(true)
    }

    const onChange = (page) => {
        setCurrentPage(page)
    }

    useEffect(() => {
        setTotalPage(data?.count)
    }, [data])

    return (
        <div>
            <TagsAddModal open={open} handleClose={handleClose} />
            <MyButton style={{ marginBottom: 20 }} onClick={handleOpen}>
                Создание тегов
            </MyButton>
            <div className="inputs-container">
                <Input.Search
                    placeholder="Тег"
                    enterButton
                    onSearch={(value) => {
                        const currValue = value
                        setName(currValue)
                    }}
                    className="input-search"
                ></Input.Search>
            </div>
            <TagsEditModal
                data={currentData}
                handleClose={handleEditModalClose}
                open={openEditModal}
            />

            <TagsTable
                data={data?.results}
                loading={isFetching}
                setCurrentData={setCurrentData}
                handleOpen={handleEditModalOpen}
                setId={setId}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination
                    defaultCurrent={1}
                    total={totalPage}
                    pageSize={30}
                    style={{ marginTop: 20 }}
                    onChange={onChange}
                    showSizeChanger={false}
                />
            </div>
        </div>
    )
}

export default TagsList
