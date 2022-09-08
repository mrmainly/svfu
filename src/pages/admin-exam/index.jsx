import React, { useState, useEffect } from 'react'
import { Button, Table, Pagination } from 'antd'

import moment from 'moment'

import { useGetAdminExamQuery } from '../../services/AdminService'
import AdminExamModal from './modal'

const AdminExam = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const [open, setOpen] = React.useState(false)
    const [modalData, setModalData] = React.useState()
    const { data, isFetching } = useGetAdminExamQuery({ currentPage: currentPage })

    const columns = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'id',
            render: (id) => (id ? id : '-'),
        },
        {
            title: 'Название тестирования',
            dataIndex: 'direction',
            key: 'direction',
            render: (direction) => (direction ? direction : '-'),
        },
        {
            title: 'Группа',
            dataIndex: 'test_group',
            key: 'test_group',
            render: (test_group) => (test_group ? test_group : '-'),
        },
        {
            title: 'Аттес-ых',
            dataIndex: 'unit',
            key: 'unit',
            render: (unit) => (unit ? unit : '-'),
        },
        {
            title: 'Начало',
            dataIndex: 'date_start',
            key: 'date_start',
            render: (date_start) =>
                date_start ? moment(date_start).format('DD.MM.YYYY, HH:mm') : '-',
        },
        {
            title: 'Конец',
            dataIndex: 'date_finish',
            key: 'date_finish',
            render: (date_finish) =>
                date_finish ? moment(date_finish).format('DD.MM.YYYY, HH:mm') : '-',
        },
        {
            title: 'Статус',
            dataIndex: 'exam_status',
            key: 'exam_status',
            filters: [
                {
                    text: 'Ожидает',
                    value: 'WAITING',
                },
                {
                    text: 'Идет тест',
                    value: 'IN_PROGRESS',
                },
                {
                    text: 'Завершен',
                    value: 'COMPLETED',
                },
                {
                    text: 'Отменен',
                    value: 'CANCELLED',
                },
            ],
            onFilter: (value, record) => record.exam_status === value,
            render: (exam_status) =>
                exam_status === 'WAITING'
                    ? 'Ожидает'
                    : exam_status === 'IN_PROGRESS'
                    ? 'Идет тест'
                    : exam_status === 'COMPLETED'
                    ? 'Завершен'
                    : exam_status === 'CANCELLED'
                    ? 'Отменен'
                    : '-',
        },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (text, record) => (
                <Button
                    type="primary"
                    onClick={() => {
                        setOpen(true)
                        setModalData(record)
                    }}
                >
                    Просмотр
                </Button>
            ),
        },
    ]
    const onChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        setTotalPage(data?.count)
    }, [data])
    return (
        <div>
            <Table
                dataSource={data?.results}
                loading={isFetching}
                columns={columns}
                rowKey="id"
                pagination={false}
            />
            {open && <AdminExamModal open={open} setOpen={setOpen} dataList={modalData} />}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination
                    defaultCurrent={1}
                    total={totalPage}
                    pageSize={30}
                    style={{ marginTop: 20 }}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}

export default AdminExam
