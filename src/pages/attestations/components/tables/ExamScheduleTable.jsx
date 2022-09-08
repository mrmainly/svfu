import React, { useState, useRef } from 'react'

import moment from 'moment'
import { Button, Table, Input, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

import { testResultStatus } from '../../../../translation/StatusTranslation'

const ExamScheduleTable = ({
    data,
    loading,
    setOpenEditModal,
    setCurrentData,
    setViewSurveyModalOpen,
    setCurrentSurveyId,
}) => {
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const searchInput = useRef()
    const navigate = useNavigate()

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
            sorter: (a, b) => a.id - b.id,
            defaultSortOrder: 'ascend',
        },
        {
            title: 'Название тестирования',
            dataIndex: 'name',
            key: 'name',
            render: (name, record) => (
                <div
                    style={{ color: '#2F80ED', textDecoration: 'underline', cursor: 'pointer' }}
                    onClick={() => {
                        setCurrentSurveyId(record.unit)
                        setViewSurveyModalOpen(true)
                    }}
                >
                    {name}
                </div>
            ),
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Группа',
            dataIndex: 'test_group',
            key: 'test_group',
            ...getColumnSearchProps('test_group'),
        },
        {
            title: 'Аттес-ых',
            dataIndex: 'testers_count',
            key: 'testers_count',
            ...getColumnSearchProps('testers_count'),
        },
        {
            title: 'Начало',
            dataIndex: 'date_start',
            key: 'date_start',
            render: (date_start) => moment(date_start).format('DD.MM.YYYY, hh:mm'),
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Конец',
            dataIndex: 'date_finish',
            key: 'date_finish',
            render: (date_finish) => moment(date_finish).format('DD.MM.YYYY, hh:mm'),
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Статус',
            dataIndex: 'exam_status',
            key: 'exam_status',
            render: (exam_status) => testResultStatus(exam_status),
            filters: [
                {
                    text: 'Ожидание',
                    value: 'WAITING',
                },
                {
                    text: 'На рассмотрении',
                    value: 'ON_REVIEW',
                },
                {
                    text: 'Рассмотрен',
                    value: 'REVIEWED',
                },
                {
                    text: 'Недоступно',
                    value: 'UNAVAILABLE',
                },
            ],
            onFilter: (value, record) => record.exam_status.indexOf(value) === 0,
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
                        setOpenEditModal(true)
                    }}
                >
                    Просмотр
                </Button>
            ),
        },
    ]

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                loading={loading}
                pagination={false}
                scroll={{ x: true }}
            />
        </>
    )
}

export default ExamScheduleTable
