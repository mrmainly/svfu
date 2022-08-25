import React from 'react'

import { Button, Table } from 'antd'

const ExaminationGroupsTable = ({ data, loading, setOpenEditModal, setTestGroupId }) => {
    const columns = [
        { title: '№', dataIndex: 'id', key: 'id' },
        {
            title: 'Название квалификации',
            dataIndex: 'direction',
            key: 'direction',
        },
        {
            title: 'Количество аттестуемых',
            dataIndex: 'testers',
            key: 'testers',
            render: (testers) => <div>{testers?.length}</div>,
        },
        {
            title: 'Статус',
            dataIndex: 'exam_status',
            key: 'exam_status',
        },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (id) => (
                <Button
                    type="primary"
                    onClick={() => {
                        setOpenEditModal(true)
                        setTestGroupId(id)
                    }}
                >
                    Перейти
                </Button>
            ),
        },
    ]

    return <Table columns={columns} dataSource={data} rowKey="id" loading={loading} />
}

export default ExaminationGroupsTable
