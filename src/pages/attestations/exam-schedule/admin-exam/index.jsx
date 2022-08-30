import React, { useRef, useState } from 'react'
import { Input, Space, Select, Button, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import moment from 'moment'

import ROUTES from '../../../../routes'

import { useGetAdminExamQuery } from '../../../../services/AdminService'
import AdminExamModal from './modal'

const { Search } = Input

const { Option } = Select

const AdminExam = () => {
    const [open, setOpen] = React.useState(false)
    const [modalData, setModalData] = React.useState()
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const { data, isFetching } = useGetAdminExamQuery()
    console.log(data)
    const searchInput = useRef()

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm()
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    }

    const handleReset = (clearFilters) => {
        clearFilters()
        setSearchText('')
    }

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Поиск...`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Поиск
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Очистить
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100)
            }
        },
    })

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
            ...getColumnSearchProps('direction'),
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

    return (
        <div>
            <Table dataSource={data?.results} loading={isFetching} columns={columns} rowKey="id" />
            <AdminExamModal open={open} setOpen={setOpen} dataList={modalData} />
        </div>
    )
}

export default AdminExam
