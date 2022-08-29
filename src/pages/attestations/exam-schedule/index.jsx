import React, { useState } from 'react'
import { Input, Space, Select, Button } from 'antd'

import ExamScheduleTable from '../components/tables/ExamScheduleTable'
import ESAddModal from '../components/modals/ESAddModal'
import { useGetTestExamQuery } from '../../../services/TutorService'
import { MyButton } from '../../../components'

const { Search } = Input

const { Option } = Select

const ExamSchedule = () => {
    const { data, isFetching } = useGetTestExamQuery('')
    const [modalEditES, setModalEditES] = useState(false)

    return (
        <div>
            <MyButton style={{ marginBottom: 20 }} onClick={() => setModalEditES(true)}>
                Назначить экзамен
            </MyButton>
            <ESAddModal open={modalEditES} setOpen={setModalEditES} />
            <ExamScheduleTable data={data?.results} loading={isFetching} />
        </div>
    )
}

export default ExamSchedule
