import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import AQEditModal from '../modals/aqeditmodal'
import Table from 'antd/lib/table'
import { Button, Input, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import ROUTES from '../../../../routes'

const AttestationsQualificationsTable = ({ data, loading }) => {
    const [currentData, setCurrentData] = useState([])
    const [modalEditQuali, setModalEditQuali] = useState(false)
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

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Название квалификации',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Тег',
            dataIndex: 'tag_direction',
            key: 'tag_direction',
            render: (tag_direction) => <>{tag_direction.name}</>,
        },
        {
            title: 'Описание',
            dataIndex: 'description',
            key: 'description',
            ...getColumnSearchProps('description'),
        },
        {
            title: 'Статус',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (is_active) => (is_active ? 'Активна' : 'Не активна'),
            filters: [
                {
                    text: 'Активна',
                    value: true,
                },
                {
                    text: 'Не активна',
                    value: false,
                },
            ],
            onFilter: (value, record) => record.is_active === value,
            render: (is_active) =>
                is_active === true ? 'Активна' : is_active === false ? 'Не активна' : '',
        },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (id) => (
                <Button
                    type="primary"
                    onClick={() => {
                        const itemData = data?.filter((e) => e.id === id)
                        setCurrentData(itemData)
                        setModalEditQuali(true)
                    }}
                >
                    Изменить
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
            <AQEditModal open={modalEditQuali} setOpen={setModalEditQuali} dataList={currentData} />
        </>
    )
}

export default AttestationsQualificationsTable
