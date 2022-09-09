import React from 'react'

import { Button, Table } from 'antd'
import PropTypes from 'prop-types'

import { statusChoices } from '../../../../constants'

const ExaminationGroupsTable = ({ data, loading, setOpenEditModal, setTestGroup, setOrdering }) => {
    const onTableChange = (newPagination, filters, sorter) => {
        if (sorter?.order === 'descend') {
            {
                setOrdering('-id')
            }
        } else if (sorter?.order === 'ascend') {
            {
                setOrdering('id')
            }
        } else {
            {
                setOrdering('')
            }
        }
    }
    const columns = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'id',
            sorter: true,
        },
        {
            title: 'Название квалификации',
            dataIndex: 'direction',
            key: 'direction',
            render: (direction) => <div>{direction?.name}</div>,
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
            render: (exam_status) => (exam_status ? statusChoices[exam_status] : '-'),
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
            onChange={onTableChange}
        />
    )
}

ExaminationGroupsTable.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    setOpenEditModal: PropTypes.func,
    setTestGroup: PropTypes.func,
    setOrdering: PropTypes.func,
}

export default ExaminationGroupsTable
