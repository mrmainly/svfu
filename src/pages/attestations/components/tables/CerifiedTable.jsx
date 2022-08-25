import React from 'react'

import { Button, Table } from 'antd'
import { useNavigate } from 'react-router-dom'

import ROUTES from '../../../../routes'

const CerifiedTable = ({ data, loading }) => {
    const navigate = useNavigate()

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        {
            title: 'ФИО',
            dataIndex: 'last_name',
            key: 'full_name',
            render: (last_name, record) => (
                <div>
                    {record.last_name} {record.first_name} {record.patronymic}
                </div>
            ),
        },
        {
            title: 'Название квалификации',
            dataIndex: 'active_application',
            key: 'active_application',
        },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (id) => (
                <Button type="primary" onClick={() => navigate(`${ROUTES.CERTIFIED_DETAIL}/${id}`)}>
                    Перейти
                </Button>
            ),
        },
    ]

    return <Table columns={columns} dataSource={data} rowKey="id" loading={loading} />
}

export default CerifiedTable
