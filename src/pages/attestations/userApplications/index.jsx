import React from 'react'
import { Input, Space, Select } from 'antd'

import UserApplicationsTable from '../components/tables/UserApplicationsTable'
import { useGetTestGroupQuery } from '../../../services/TestGroup'

const { Search } = Input

const { Option } = Select

const UserApplications = () => {
    const { data, isFetching } = useGetTestGroupQuery('')

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

export default UserApplications
