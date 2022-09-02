import React from 'react'

import { Button, Table } from 'antd'

import { testResultStatus } from '../../../../translation/StatusTranslation'

const ExaminationGroupsTable = ({ data, loading, setOpenEditModal, setTestGroup }) => {
    const columns = [
        { title: '№', dataIndex: 'id', key: 'id' },
        {
            title: 'Название квалификации',
            dataIndex: 'direction',
            key: 'direction',
            render: (direction) => <div>{direction?.name}</div>,
            filters: data?.map((item) => ({
                text: item.direction.name,
                value: item.direction.name,
            })),

            onFilter: (value, record) => record.direction?.name.indexOf(value) === 0,
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
            render: (exam_status) => testResultStatus(exam_status),
            filters: [
                {
                    text: 'Ожидание',
                    value: 'WAITING',
                },
                {
                    text: 'На рассмотрении',
                    value: 'ON_REVIEW',
                },
                {
                    text: 'Рассмотрен',
                    value: 'REVIEWED',
                },
                {
                    text: 'Недоступно',
                    value: 'UNAVAILABLE',
                },
            ],
            onFilter: (value, record) => record.exam_status.indexOf(value) === 0,
        },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (id, record) => (
                <Button
                    type="primary"
                    onClick={() => {
                        setOpenEditModal(true)
                        setTestGroup(record)
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
