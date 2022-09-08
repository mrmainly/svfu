import React, { useState, useEffect } from 'react'
import { Pagination } from 'antd'

import { MyButton } from '../../components'
import ExaminationGroupsTable from './compoents/table'
import { useGetTestGroupQuery, useGetDirectionTuterQuery } from '../../services/TutorService'
import EgCreateModal from './compoents/modals/egCreateModal'
import EgEditModal from './compoents/modals/egEditModal'

const ExaminationGroups = () => {
    const [open, setOpen] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [testGroup, setTestGroup] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const { data, isFetching } = useGetTestGroupQuery({ currentPage: currentPage })
    const { data: direction } = useGetDirectionTuterQuery('')
    const onChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        setTotalPage(data?.count)
    }, [data])
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
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination
                    defaultCurrent={1}
                    total={totalPage}
                    pageSize={30}
                    style={{ marginTop: 20 }}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}

export default ExaminationGroups
