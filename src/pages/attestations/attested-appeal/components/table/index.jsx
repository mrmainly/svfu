import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../../../../routes'

import moment from 'moment'

import { Button, Table, Input, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { uaStatus } from '../../../../../translation/StatusTranslation'

const AppealTable = ({ data, loading }) => {
    const navigate = useNavigate()
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
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
    console.log(data)
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Название тестирования',
            dataIndex: 'survey_name',
            key: 'survey_name',
            ...getColumnSearchProps('survey_name'),
        },
        {
            title: 'ID аттесту-го',
            dataIndex: 'user_id',
            key: 'user_id',
            ...getColumnSearchProps('user_id'),
        },
        {
            title: 'Дата начала теста',
            dataIndex: 'date_start',
            key: 'date_start',
            render: (date_start) => moment(date_start).format('DD.MM.YYYY, hh:mm'),
            sorter: (a, b) => moment(a.date_start) - moment(b.date_start),
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <div>{uaStatus(status)}</div>,
            filters: [
                {
                    text: 'Принято',
                    value: 'APPROVED',
                },
                {
                    text: 'Ожидание',
                    value: 'WAITING',
                },
                {
                    text: 'Отклонен',
                    value: 'REJECTED',
                },
                {
                    text: 'Завершен',
                    value: 'FINISHED',
                },
                {
                    text: 'Отменен',
                    value: 'CANCELLED',
                },
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
        },
        {
            title: 'Баллы',
            dataIndex: 'score_first_part',
            key: 'score_first_part',
            ...getColumnSearchProps('score_first_part'),
        },
        {
            title: 'Действие',
            dataIndex: 'status',
            key: 'x',
            render: (status, record) =>
                status === 'WAITING' ? (
                    <Button
                        type="primary"
                        onClick={() => {
                            navigate(ROUTES.MODERATOR_APPEAL, {
                                state: {
                                    id: record.id,
                                },
                            })
                            localStorage.setItem(
                                'side_bar_data_ex_mo',
                                JSON.stringify(record.result, null, '\t')
                            )
                        }}
                    >
                        Просмотр
                    </Button>
                ) : (
                    <Button type="primary" disabled>
                        Недоступно
                    </Button>
                ),
        },
    ]
    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                rowKey="id"
                pagination={false}
            />
        </>
    )
}

export default AppealTable
