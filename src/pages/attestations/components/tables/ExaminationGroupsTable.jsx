import React from 'react'

import { Button, Table } from 'antd'

const ExaminationGroupsTable = ({ data, loading }) => {
    const columns = [
        { title: '№', dataIndex: 'id', key: 'id' },
        {
            title: 'Название валификации',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Количество аттестуемых',
            dataIndex: 'testers',
            key: 'testers',
            render: (testers) => <div>{testers?.length}</div>,
        },
        {
            title: 'Статус',
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

export default ExaminationGroupsTable
