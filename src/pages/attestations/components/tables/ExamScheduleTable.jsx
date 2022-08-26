import React, { useState } from 'react'
import moment from 'moment'
import { Button, Table } from 'antd'
import { useNavigate } from 'react-router-dom'

import ROUTES from '../../../../routes'
import ESAddModal from '../modals/ESAddModal'
const ExamScheduleTable = ({ data, loading }) => {
    const [currentData, setCurrentData] = useState()
    const [modal, setModal] = useState(false)
    const columns = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Название тестирования',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Группа',
            dataIndex: 'test_group',
            key: 'test_group',
        },
        {
            title: 'Аттес-ых',
            dataIndex: 'testers_count',
            key: 'testers_count',
        },
        {
            title: 'Начало',
            dataIndex: 'date_start',
            key: 'date_start',
            render: (date_start) => moment(date_start).format('DD.MM.YYYY, hh:mm'),
        },
        {
            title: 'Конец-ых',
            dataIndex: 'date_finish',
            key: 'date_finish',
            render: (date_finish) => moment(date_finish).format('DD.MM.YYYY, hh:mm'),
        },
        {
            title: 'Статус',
            dataIndex: 'exam_status',
            key: 'exam_status',
            render: (exam_status) =>
                exam_status === 'WAITING'
                    ? 'Ожидание'
                    : exam_status === 'IN_PROGRESS'
                    ? 'Идет тест'
                    : exam_status === 'COMPLETED'
                    ? 'Завершено'
                    : exam_status === 'CANCELLED '
                    ? 'Отменено'
                    : null,
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
                        setModal(true)
                    }}
                >
                    Просмотр
                </Button>
            ),
        },
    ]

    return (
        <>
            <ESAddModal open={modal} setOpen={setModal} dataList={currentData} />
            <Table columns={columns} dataSource={data} rowKey="id" loading={loading} />
        </>
    )
}

export default ExamScheduleTable
