import { useState, useRef } from 'react'
import { Table, message, Typography, Button, Input, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { MyButton } from '../../../../components'

import {
    usePostDirectionMutation,
    usePutDirectionMutation,
} from '../../../../services/DirectionService'

const { Text } = Typography

const AppilyngTable = ({ data, loading, refetchFunc }) => {
    const [postDirection] = usePostDirectionMutation()
    const [putDirection] = usePutDirectionMutation()
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

    const onSubmit = (data) => {
        postDirection({ direction: data }).then((res) => {
            if (res.data) {
                message.success('Заявление подано')
                refetchFunc()
            } else {
                message.error(res.error.data.errors[0])
            }
        })
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Название квалификации',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Статус',
            dataIndex: 'status_application',
            key: 'status_application',
            render: (status_application) =>
                status_application ? <Text>На рассмотрении</Text> : <Text>Не отправлен</Text>,
            filters: [
                {
                    text: 'На рассмотрении',
                    value: true,
                },
                {
                    text: 'Не отправлен',
                    value: false,
                },
            ],
            onFilter: (value, record) => record.status_application === value,
        },

        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (id, { status_application }) =>
                status_application ? (
                    <Button
                        style={{
                            width: 'max-content',
                            border: 4,
                        }}
                        size="large"
                        type="danger"
                        onClick={() => {
                            putDirection(id).then((res) => {
                                if (res.data) {
                                    refetchFunc()
                                    message.success('Заявление отменено')
                                } else {
                                    message.error(res.error.data.errors[0])
                                }
                            })
                        }}
                    >
                        Отмена
                    </Button>
                ) : (
                    <MyButton onClick={() => onSubmit(id)}>Подать заявление</MyButton>
                ),
        },
    ]

    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            loading={loading}
            scroll={{ x: true }}
            pagination={false}
        />
    )
}

export default AppilyngTable
