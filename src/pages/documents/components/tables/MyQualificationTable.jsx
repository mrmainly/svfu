import { useState } from 'react'
import Table from 'antd/lib/table'
import { Button } from 'antd'
import moment from 'moment'
import PropTypes from 'prop-types'

import MQEditModal from '../modals/mqeditmodal'

const MyQualificationTable = ({ data, loading }) => {
    const [currentData, setCurrentData] = useState()
    const [modalEditMQ, setModalEditMQ] = useState(false)
    const columns = [
        { title: '№ документа', dataIndex: 'id', key: 'id' },
        {
            title: 'Название квалификации',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Дата выдачи',
            dataIndex: 'date_of_issue',
            key: 'date_of_issue',
            render: (date_of_issue) => moment(date_of_issue).format('DD.MM.YYYY'),
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
            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                loading={loading}
                pagination={false}
                scroll={{ x: true }}
                // style={{ overflow: 'scroll' }}
            />
        </>
    )
}

MyQualificationTable.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
}

export default MyQualificationTable
