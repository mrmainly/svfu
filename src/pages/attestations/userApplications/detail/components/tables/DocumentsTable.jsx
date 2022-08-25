import React from 'react'

import { Button, Table } from 'antd'
import { useNavigate } from 'react-router-dom'

import ROUTES from '../../../../../../routes'

const DocumentsTable = ({ data, loading }) => {
    const navigate = useNavigate()

    const columns = [
        {
            title: 'Документ',
            dataIndex: 'user',
            key: 'user',
            render: (user) => (
                <div>
                    {user.last_name} {user.first_name} {user.patronymic}
                </div>
            ),
        },
        {
            title: 'Тип документа',
            dataIndex: 'direction',
            key: 'direction',
            render: (direction) => <div>{direction.name}</div>,
        },
        {
            title: 'Описание',
            dataIndex: 'testers',
            key: 'testers',
            render: (testers) => <div>{testers?.length}</div>,
        },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (id) => (
                <Button
                    type="primary"
                    onClick={() => navigate(`${ROUTES.USER_APPLICATIONS_DETAIL}/${id}`)}
                >
                    Посмотреть
                </Button>
            ),
        },
    ]

    return <Table columns={columns} dataSource={data} rowKey="id" loading={loading} />
}

export default DocumentsTable
