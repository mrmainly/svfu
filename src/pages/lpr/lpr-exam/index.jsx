import React, { useState, useEffect } from 'react'
import { Input, Select, Button, Table, Pagination } from 'antd'

import moment from 'moment'

import { useGetLprExamListQuery } from '../../../services/LprService'
import LprExamModal from './modal'
import './lpr-exam.css'

const LprExam = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const [open, setOpen] = React.useState(false)
    const [modalData, setModalData] = React.useState()
    const [order, setOrder] = useState('')
    const [status, setStatus] = useState('')
    const [unit, setUnit] = useState('')
    const { data, isFetching } = useGetLprExamListQuery({
        status: status,
        order: order,
        currentPage: currentPage,
        unit: unit,
    })

    const onChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        setTotalPage(data?.count)
    }, [data])

    const orderSelect = [
        {
            text: '-',
            value: '',
        },
        {
            text: 'По номеру (возрастание)',
            value: 'id',
        },
        {
            text: 'По номеру (убывание)',
            value: '-id',
        },
        {
            text: 'Начало (возрастание)',
            value: 'date_start',
        },
        {
            text: 'Начало (убывание)',
            value: '-date_start',
        },
        {
            text: 'Конец (возрастание)',
            value: 'date_finish',
        },
        {
            text: 'Конец (убывание)',
            value: '-date_finish',
        },
    ]

    const statusSelect = [
        {
            text: 'Все статусы',
            value: '',
        },
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
    ]

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
            render: (name) => (name ? name : '-'),
        },
        {
            title: 'Группа',
            dataIndex: 'test_group_id',
            key: 'test_group_id',
            render: (test_group_id) => (test_group_id ? test_group_id : '-'),
        },
        {
            title: 'Аттес-ых',
            dataIndex: 'testers_count_from_group',
            key: 'testers_count_from_group',
            render: (testers_count_from_group) =>
                testers_count_from_group ? testers_count_from_group : '-',
        },
        {
            title: 'Начало',
            dataIndex: 'date_start',
            key: 'date_start',
            render: (date_start) =>
                date_start ? moment(date_start).format('DD.MM.YYYY, hh:mm') : '-',
        },
        {
            title: 'Конец',
            dataIndex: 'date_finish',
            key: 'date_finish',
            render: (date_finish) =>
                date_finish ? moment(date_finish).format('DD.MM.YYYY, hh:mm') : '-',
        },
        {
            title: 'Статус',
            dataIndex: 'exam_status',
            key: 'exam_status',
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

    return (
        <div>
            <div className="inputs-container">
                <Input.Search
                    placeholder="Тестирование"
                    enterButton
                    onSearch={(value) => {
                        const currValue = value
                        setUnit(currValue)
                    }}
                    className="input-search"
                />
                <Select
                    placeholder="Сортировка"
                    className="input-search"
                    onChange={(value) => setOrder(value)}
                >
                    {orderSelect.map((item, index) => (
                        <Select.Option value={item.value} key={index}>
                            {item.text}
                        </Select.Option>
                    ))}
                </Select>
                <Select
                    placeholder="Статус"
                    className="input-search"
                    onChange={(value) => setStatus(value)}
                >
                    {statusSelect.map((item, index) => (
                        <Select.Option value={item.value} key={index}>
                            {item.text}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <Table
                dataSource={data?.results}
                loading={isFetching}
                columns={columns}
                rowKey="id"
                pagination={false}
            />
            <LprExamModal open={open} setOpen={setOpen} data={modalData} />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination
                    defaultCurrent={1}
                    total={totalPage}
                    pageSize={30}
                    style={{ marginTop: 20 }}
                    onChange={onChange}
                    showSizeChanger={false}
                />
            </div>
        </div>
    )
}

export default LprExam
