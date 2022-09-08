import { useState } from 'react'

import Table from 'antd/lib/table'
import { Button } from 'antd'
import PropTypes from 'prop-types'

import QualificationModal from '../modals/QualificationModal'

import moment from 'moment'

const QualificationTable = ({ qualifications }) => {
    const [open, setOpen] = useState(false)
    const [data, setData] = useState()
    const columns = [
        { title: '№', dataIndex: 'id', key: 'id', render: (id) => (id ? id : '-') },
        {
            title: 'Название классификации',
            dataIndex: 'name',
            key: 'name',
            render: (name) => (name ? name : '-'),
        },
        {
            title: 'Дата выдачи',
            dataIndex: 'date_of_issue',
            key: 'date_of_issue',
            render: (date) => (date ? moment(date).format('DD.MM.YYYY') : '-'),
        },
        {
            title: 'Посмотреть',
            dataIndex: 'id',
            key: 'x',
            render: (text, record) => (
                <Button
                    type="primary"
                    onClick={() => {
                        setOpen(true)
                        setData(record)
                    }}
                >
                    Посмотреть
                </Button>
            ),
        },
    ]

    return (
        <>
            <Table columns={columns} dataSource={qualifications} rowKey="id" scroll={{ x: true }} />
            <QualificationModal open={open} setOpen={setOpen} data={data} />
        </>
    )
}

QualificationTable.propTypes = {
    qualifications: PropTypes.array,
}

export default QualificationTable
