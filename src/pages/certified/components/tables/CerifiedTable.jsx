import React from 'react'

import { Button, Table } from 'antd'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import ROUTES from '../../../../routes'

const CerifiedTable = ({ data, loading }) => {
    const navigate = useNavigate()

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            defaultSortOrder: 'ascend',
        },
        {
            title: 'ФИО',
            dataIndex: 'full_name',
            key: 'full_name',
        },
        {
            title: 'Название квалификации',
            dataIndex: 'active_application',
            key: 'active_application',
        },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (id) => (
                <Button type="primary" onClick={() => navigate(`${ROUTES.CERTIFIED_DETAIL}/${id}`)}>
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

CerifiedTable.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
}

export default CerifiedTable
