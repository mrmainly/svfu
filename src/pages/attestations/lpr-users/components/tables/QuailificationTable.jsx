import { useState } from 'react'

import Table from 'antd/lib/table'
import { Button } from 'antd'

import QualificationModal from '../modals/QualificationModal'

import moment from 'moment'

const QualificationTable = ({ qualifications }) => {
    const [open, setOpen] = useState(false)
    const [data, setData] = useState()
    const columns = [
        { title: '№', dataIndex: 'id', key: 'id' },
        { title: 'Название классификации', dataIndex: 'name', key: 'name' },
        {
            title: 'Дата выдачи',
            dataIndex: 'date_of_issue',
            key: 'date_of_issue',
            render: (date) => moment(date).format('DD.MM.YYYY'),
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
            <Table columns={columns} dataSource={qualifications} rowKey="id" />
            <QualificationModal open={open} setOpen={setOpen} data={data} />
        </>
    )
}

export default QualificationTable
