import React from 'react'
import { Input, Space, Select } from 'antd'

import CerifiedTable from '../components/tables/CerifiedTable'

const { Search } = Input

const { Option } = Select

const Certified = () => {
    return (
        <div>
            <Space style={{ marginBottom: 20 }}>
                <Search size="large" enterButton placeholder="Поиск..." />
                <Select style={{ width: 220 }} size="large" placeholder="Выберите направление">
                    <Option value="jack">Jack</Option>
                </Select>
            </Space>
            <CerifiedTable />
        </div>
    )
}

export default Certified
