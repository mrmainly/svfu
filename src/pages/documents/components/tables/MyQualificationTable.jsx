import { useState } from 'react'
import Table from 'antd/lib/table'
import { Button } from 'antd'
import MQEditModal from '../modals/mqeditmodal'

const MyQualificationTable = ({ data, loading }) => {
    const [currentData, setCurrentData] = useState()
    const [modalEditMQ, setModalEditMQ] = useState(false)

    const columns = [
        { title: '№ документа', dataIndex: 'name', key: 'name' },
        {
            title: 'Название квалификации',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Дата выдачи',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (text, record) => (
                <Button
                    type="primary"
                    onClick={() => {
                        setCurrentData(record)
                        setModalEditMQ(true)
                    }}
                >
                    Изменить
                </Button>
            ),
        },
    ]
    return (
        <>
            <MQEditModal open={modalEditMQ} setOpen={setModalEditMQ} dataList={currentData} />
            <Table columns={columns} dataSource={data} rowKey="id" loading={loading} />
        </>
    )
}

export default MyQualificationTable
