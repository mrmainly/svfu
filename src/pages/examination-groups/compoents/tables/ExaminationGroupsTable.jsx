import React from 'react'

import { Button, Table } from 'antd'
import PropTypes from 'prop-types'

import { testResultStatus } from '../../../../translation/StatusTranslation'

const ExaminationGroupsTable = ({ data, loading, setOpenEditModal, setTestGroup }) => {
    const directionData = data?.map((item) => {
        return (item = item.direction.name)
    })
    const columns = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            defaultSortOrder: 'ascend',
        },
        {
            title: 'Название квалификации',
            dataIndex: 'direction',
            key: 'direction',
            render: (direction) => <div>{direction?.name}</div>,
            filters: directionData
                ?.filter((item, index) => {
                    return directionData?.indexOf(item) === index
                })
                .map((item) => ({
                    text: item,
                    value: item,
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

    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            loading={loading}
            pagination={false}
            scroll={{ x: true }}
        />
    )
}

ExaminationGroupsTable.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    setOpenEditModal: PropTypes.func,
    setTestGroup: PropTypes.func,
}

export default ExaminationGroupsTable
