import React from 'react'

import { Button, Table } from 'antd'
import PropTypes from 'prop-types'

const QualificationTable = ({ data, setOpen, setQualificationData }) => {
    const columns = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Название квалификации',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Дата выдачи',
            dataIndex: 'date_start',
            key: 'date_start',
        },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (id, record) => (
                <Button
                    type="primary"
                    onClick={() => {
                        setOpen(true)
                        setQualificationData(record)
                    }}
                >
                    Проверить
                </Button>
            ),
        },
    ]

    return <Table columns={columns} dataSource={data} rowKey="id" scroll={{ x: true }} />
}

QualificationTable.propTypes = {
    data: PropTypes.array,
    setOpen: PropTypes.func,
    setQualificationData: PropTypes.func,
}

export default QualificationTable
