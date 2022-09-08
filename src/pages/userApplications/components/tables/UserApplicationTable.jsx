import React, { useRef } from 'react'
import { Input, Space, Button, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import ROUTES from '../../../../routes'
import { userAppilicationStatus } from '../../../../translation/StatusTranslation'

const UserApplicationsTable = ({ data, loading }) => {
    const navigate = useNavigate()
    const searchInput = useRef()

    const getColumnSearchProps = () => ({
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
                    onPressEnter={() => confirm()}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => confirm()}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Поиск
                    </Button>
                    <Button
                        onClick={() => clearFilters()}
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
            ...getColumnSearchProps(),
            onFilter: (value, record) =>
                record.user.full_name?.toString().toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: 'Название квалификации',
            dataIndex: ['direction', 'name'],
            key: 'direction',
            ...getColumnSearchProps(),
            onFilter: (value, record) =>
                record.direction.name?.toString().toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: 'Должность',
            dataIndex: ['user', 'post'],
            key: 'post',
            ...getColumnSearchProps(),
            onFilter: (value, record) =>
                record.user.post?.toString().toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: 'Стаж работы',
            dataIndex: ['user', 'total_experience'],
            key: 'total_experience',
            ...getColumnSearchProps(),
            onFilter: (value, record) =>
                record.user.total_experience
                    ?.toString()
                    .toLowerCase()
                    .includes(value.toLowerCase()),
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <div>{userAppilicationStatus(status)}</div>,

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
            scroll={{ x: true }}
        />
    )
}

UserApplicationsTable.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
}

export default UserApplicationsTable
