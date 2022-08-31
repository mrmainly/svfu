import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { SearchOutlined } from '@ant-design/icons'
import Table from 'antd/lib/table'
import { Button, Input, Space } from 'antd'

import { useGetAttestationUsersQuery } from '../../../../../services/AttestationProtocolService'
import { DynamicPathSlice } from '../../../../../reducers/DynamicPathSlice'
import ROUTES from '../../../../../routes'

const UsersTable = () => {
    const { handlePath, handleFullName, handleRole, handleCurrentPath } = DynamicPathSlice.actions
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const { data, isLoading } = useGetAttestationUsersQuery()
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
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'ФИО',
            dataIndex: 'full_name',
            key: 'full_name',
            ...getColumnSearchProps('full_name'),
        },
        {
            title: 'Текущая аттестация',
            dataIndex: 'active_application',
            key: 'active_application',
            render: (active_application) => (active_application ? active_application : '-'),
            ...getColumnSearchProps('active_application'),
        },
        {
            title: 'Роль',
            dataIndex: 'role',
            key: 'role',
            filters: [
                {
                    text: 'Администратор',
                    value: 'ADMIN',
                },
                {
                    text: 'Модератор',
                    value: 'MODERATOR',
                },
                {
                    text: 'Эксперт',
                    value: 'EXPERT',
                },
                {
                    text: 'Тьютор',
                    value: 'TUTOR',
                },
                {
                    text: 'Менеджер оценочных средств',
                    value: 'CONSTRUCTOR',
                },
                {
                    text: 'Лицо принимающее решение',
                    value: 'LPR',
                },
                {
                    text: 'Аттестуемый',
                    value: 'TESTER',
                },
            ],
            onFilter: (value, record) => record.role === value,
            render: (role) =>
                role === 'ADMIN'
                    ? 'Администратор'
                    : role === 'MODERATOR'
                    ? 'Модератор'
                    : role === 'EXPERT'
                    ? 'Эксперт'
                    : role === 'TUTOR'
                    ? 'Тьютор'
                    : role === 'CONSTRUCTOR'
                    ? 'Менеджер оценочных средств'
                    : role === 'LPR'
                    ? 'Лицо принимающее решение'
                    : role === 'TESTER'
                    ? 'Аттестуемый'
                    : '',
        },
        {
            title: 'Блокировка',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (is_active) => (is_active ? '-' : 'Заблокирован'),
        },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (id) => (
                <Button
                    type="primary"
                    onClick={() => {
                        navigate(ROUTES.LPR_USERS_DETAIL + `/${id}`)
                        dispatch(handlePath(ROUTES.LPR_USERS))
                        dispatch(handleRole(data?.results.filter((item) => item.id === id)[0].role))
                        dispatch(
                            handleFullName(
                                data?.results.filter((item) => item.id === id)[0].full_name
                            )
                        )
                        dispatch(handleCurrentPath(ROUTES.LPR_USERS_DETAIL + `/${id}`))
                    }}
                >
                    Перейти
                </Button>
            ),
        },
    ]

    return (
        <>
            <Table columns={columns} dataSource={data?.results} rowKey="id" />
        </>
    )
}

export default UsersTable
