import React from 'react'

import { Button, Table } from 'antd'
import { useNavigate } from 'react-router-dom'

import ROUTES from '../../../../routes'

const UserApplicationsTable = ({ data, loading }) => {
    const navigate = useNavigate()

    const columns = [
        {
            title: 'ФИО',
            dataIndex: 'user',
            key: 'user',
            render: (user) => (
                <div>
                    {user.last_name} {user.first_name} {user.patronymic}
                </div>
            ),
        },
        {
            title: 'Название квалификации',
            dataIndex: 'direction',
            key: 'direction',
            render: (direction) => <div>{direction.name}</div>,
        },
        {
            title: 'Должность',
            dataIndex: 'user',
            key: 'post',
            render: (user) => <div>{user?.post}</div>,
        },
        {
            title: 'Стаж работы',
            dataIndex: 'user',
            key: 'total_experience',
            render: (user) => <div>{user?.total_experience}</div>,
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
                    Просмотр
                </Button>
            ),
        },
    ]

    return <Table columns={columns} dataSource={data} rowKey="id" loading={loading} />
}

export default UserApplicationsTable
