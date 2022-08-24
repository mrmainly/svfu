import React from 'react'
import { Input, Space, Select } from 'antd'

import UserApplicationsTable from '../components/tables/UserApplicationsTable'
import { useGetTestGroupQuery } from '../../../services/TutorService'

const { Search } = Input

const { Option } = Select

const ExamSchedule = () => {
    const { data, isFetching } = useGetTestGroupQuery('')

    console.log(data)

    return (
        <div>
            <Space style={{ marginBottom: 20 }}>
                <Search size="large" enterButton placeholder="Поиск..." />
                <Select style={{ width: 220 }} size="large" placeholder="Выберите направление">
                    <Option value="jack">Jack</Option>
                </Select>
            </Space>

            <UserApplicationsTable data={data} loading={isFetching} />
        </div>
    )
}

export default ExamSchedule
