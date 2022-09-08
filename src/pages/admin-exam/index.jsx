import React, { useState, useEffect } from 'react'
import { Pagination } from 'antd'

import { useGetAdminExamQuery } from '../../services/AdminService'
import AdminExamModal from './modal'
import AdminExamTable from './table'

const AdminExam = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const [open, setOpen] = React.useState(false)
    const [modalData, setModalData] = React.useState()
    const { data, isFetching } = useGetAdminExamQuery({ currentPage: currentPage })

    const onChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        setTotalPage(data?.count)
    }, [data])
    return (
        <div>
            <AdminExamTable
                data={data}
                loading={isFetching}
                setModalData={setModalData}
                setOpen={setOpen}
            />
            {open && <AdminExamModal open={open} setOpen={setOpen} dataList={modalData} />}
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

export default AdminExam
