import React from 'react'

import { Button, Table } from 'antd'

const UserApplicationsTable = ({ data, loading }) => {
    const columns = [
        { title: 'ФИО', dataIndex: 'id', key: 'id' },
        {
            title: 'Название квалификации',
            dataIndex: 'name',
            key: 'name',
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
            render: (id) => <Button type="primary">Перейти</Button>,
        },
    ]

    return <Table columns={columns} dataSource={data} rowKey="id" loading={loading} />
}

export default UserApplicationsTable
