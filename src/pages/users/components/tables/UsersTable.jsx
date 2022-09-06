import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import Table from 'antd/lib/table'
import { Button, Input, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import ROUTES from '../../../../routes'
import { adminUserStatusTrans } from '../../../../translation/StatusTranslation'

const UsersTable = ({ data, isLoading, setRole, setId, setName }) => {
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
    const onTableChange = (newPagination, filters, sorter) => {
        if (filters?.role?.length > 0) {
            {
                setRole(filters?.role[0])
            }
        } else {
            setRole('')
        }
        if (sorter?.order === 'descend') {
            {
                setId('-id')
            }
        } else if (sorter?.order === 'ascend') {
            {
                setId('id')
            }
        } else {
            {
                setId('')
            }
        }
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'ФИО',
            dataIndex: 'full_name',
            key: 'full_name',
        },
        {
            title: 'Текущая аттестация',
            dataIndex: 'active_application',
            key: 'active_application',
            render: (active_application) => (active_application ? active_application : '-'),
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
            render: (role) => adminUserStatusTrans(role),
            filterMultiple: false,
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
            render: (id, record) => (
                <Button
                    type="primary"
                    onClick={() => {
                        navigate(ROUTES.USERS_DETAIL + `/${id}`, {
                            state: {
                                type: 'LPR',
                            },
                        })
                    }}
                >
                    Перейти
                </Button>
            ),
        },
    ]

    return (
        <>
            <Input.Search
                placeholder="ФИО"
                enterButton
                onSearch={(value) => {
                    const currValue = value
                    setName(currValue)
                }}
                style={{ marginBottom: 16, width: '50%' }}
            />

            <Table
                columns={columns}
                dataSource={data?.results}
                loading={isLoading}
                rowKey="id"
                pagination={false}
                scroll={{ x: true }}
                onChange={onTableChange}
            />
        </>
    )
}

export default UsersTable
