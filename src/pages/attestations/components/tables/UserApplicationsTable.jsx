import React from 'react'

import { Button, Table } from 'antd'

const UserApplicationsTable = ({ data, loading, navigate }) => {
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
            dataIndex: 'testers',
            key: 'testers',
            render: (testers) => <div>{testers?.length}</div>,
        },
        {
            title: 'Стаж работы',
            dataIndex: 'difficult',
            key: 'difficult',
        },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (id) => <Button type="primary">Проверить</Button>,
        },
    ]

    return <Table columns={columns} dataSource={data} rowKey="id" loading={loading} />
}

export default UserApplicationsTable
