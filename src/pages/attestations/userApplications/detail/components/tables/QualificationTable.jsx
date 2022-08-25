import React from 'react'

import { Button, Table } from 'antd'
import { useNavigate } from 'react-router-dom'

import ROUTES from '../../../../../../routes'

const QualificationTable = ({ data, loading }) => {
    const navigate = useNavigate()

    console.log('qualification', data)

    const columns = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Название квалификации',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Дата выдачи',
            dataIndex: 'testers',
            key: 'testers',
        },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (id) => <Button type="primary">Проверить</Button>,
        },
    ]

    return <Table columns={columns} dataSource={data} rowKey="id" />
}

export default QualificationTable
