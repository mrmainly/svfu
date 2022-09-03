import React, { useRef, useState } from 'react'
import { Input, Space, Select, Button, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { useNavigate } from 'react-router-dom'

import ROUTES from '../../../../routes'
import { uaStatus } from '../../../../translation/StatusTranslation'

const UserApplicationsTable = ({ data, loading }) => {
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
        onFilter: (value, record) => {
            record.user.full_name?.toString().toLowerCase().includes(value.toLowerCase())
            console.log(
                record.user.full_name?.toString().toLowerCase().includes(value.toLowerCase())
            )
            console.log(record.user.full_name)
            console.log(record)
            console.log(value)
        },
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100)
            }
        },
    })

    const statusData = [
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
    ]

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            defaultSortOrder: 'descend',
        },
        {
            title: 'ФИО',
            dataIndex: ['user', 'full_name'],
            key: 'full_name',
            // render: (user) => <div>{user.full_name}</div>,
            ...getColumnSearchProps(['user', 'full_name']),
        },
        {
            title: 'Название квалификации',
            dataIndex: ['direction', 'name'],
            key: 'direction',
            // render: (direction) => <div>{direction.name}</div>,
            ...getColumnSearchProps(['direction', 'name']),
        },
        {
            title: 'Должность',
            dataIndex: ['user', 'post'],
            key: 'post',
            // render: (user) => <div>{user?.post}</div>,
            ...getColumnSearchProps(['user', 'post']),
        },
        {
            title: 'Стаж работы',
            dataIndex: ['user', 'total_experience'],
            key: 'total_experience',
            // render: (user) => <div>{user?.total_experience}</div>,
            ...getColumnSearchProps(['user', 'total_experience']),
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <div>{uaStatus(status)}</div>,

            filters: statusData?.map((item) => ({
                text: item.text,
                value: item.value,
            })),

            onFilter: (value, record) => record.status.indexOf(value) === 0,
        },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (id) => (
                <Button
                    type="primary"
                    onClick={() => navigate(`${ROUTES.USER_APPLICATIONS_DETAIL}/${id}`)}
                >
                    Просмотр
                </Button>
            ),
        },
    ]

    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            loading={loading}
            pagination={false}
        />
    )
}

export default UserApplicationsTable
