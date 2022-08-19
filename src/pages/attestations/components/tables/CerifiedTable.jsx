import React from 'react'

import { Button, Table } from 'antd'

const CerifiedTable = ({ data, loading }) => {
    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'ФИО', dataIndex: 'id', key: 'id' },
        {
            title: 'Название квалификации',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '',
            dataIndex: 'testers',
            key: 'testers',
            render: (testers) => <div>{testers?.length}</div>,
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

export default CerifiedTable
