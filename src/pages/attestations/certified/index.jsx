import React from 'react'
import { Input, Space, Select } from 'antd'

import CerifiedTable from '../components/tables/CerifiedTable'
import { useGetTesterQuery } from '../../../services/TutorService'

const { Search } = Input

const { Option } = Select

const Certified = () => {
    const { data: tester, isLoading } = useGetTesterQuery('')

    return (
        <div>
            {/* <Space style={{ marginBottom: 20 }}>
                <Search size="large" enterButton placeholder="Поиск..." />
                <Select style={{ width: 220 }} size="large" placeholder="Выберите направление">
                    <Option value="jack">Jack</Option>
                </Select>
            </Space> */}
            <CerifiedTable data={tester?.results} loading={isLoading} />
        </div>
    )
}

export default Certified
