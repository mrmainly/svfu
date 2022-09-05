import React, { useState, useEffect } from 'react'
import { Pagination } from 'antd'

import ExamScheduleTable from '../components/tables/ExamScheduleTable'
import ESAddModal from '../components/modals/ESAddModal'
import ESEditModal from '../components/modals/ESEditModal'
import { useGetTestExamQuery } from '../../../services/TutorService'
import { MyButton } from '../../../components'

const ExamSchedule = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const [currentData, setCurrentData] = useState()
    const { data, isFetching } = useGetTestExamQuery({ currentPage: currentPage })
    const [modalEditES, setModalEditES] = useState(false)
    const [modalAddES, setModalAddES] = useState(false)
    const onChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        setTotalPage(data?.count)
    }, [data])
    return (
        <div>
            <MyButton style={{ marginBottom: 20 }} onClick={() => setModalEditES(true)}>
                Назначить экзамен
            </MyButton>
            <ESAddModal open={modalAddES} setOpen={setModalAddES} />
            <ESEditModal open={modalEditES} setOpen={setModalEditES} dataList={currentData} />
            <ExamScheduleTable
                data={data?.results}
                loading={isFetching}
                setOpenEditModal={setModalEditES}
                setCurrentData={setCurrentData}
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

export default ExamSchedule
