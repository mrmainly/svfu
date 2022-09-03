import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import Table from 'antd/lib/table'
import { Button, Input, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import QBEditModal from '../modals/qbeditmodal'
import { useGetAttestationsQualificationQuery } from '../../../../services/AttestationService'

const QuestionsBankTable = ({ data, loading }) => {
    const { data: dataDirection, isLoading } = useGetAttestationsQualificationQuery()
    const [currentData, setCurrentData] = useState()
    const [modalEditQuestionsBank, setModalEditQuestionsBank] = useState(false)
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
            title: '№',
            dataIndex: 'id',
            key: 'id',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Текст вопроса',
            dataIndex: 'description',
            key: 'description',
            ...getColumnSearchProps('description'),
        },
        {
            title: 'Квалификации',
            dataIndex: 'direction',
            key: 'direction',
            render: (direction) =>
                (direction = direction
                    .map(
                        (item, index) =>
                            (item = dataDirection?.results?.filter((dir) => dir.id === item)[0]
                                .name)
                    )
                    .join(', ')),
        },
        {
            title: 'Сложность',
            dataIndex: 'difficulty',
            key: 'difficulty',
            filters: [
                {
                    text: 'Легкий',
                    value: 'BEGINNER',
                },
                {
                    text: 'Средний',
                    value: 'ADVANCED',
                },
                {
                    text: 'Сложный',
                    value: 'EXPERT',
                },
                {
                    text: 'Открытый',
                    value: 'DESCRIBE',
                },
            ],
            onFilter: (value, record) => record.difficulty === value,
            render: (difficulty) =>
                difficulty === 'BEGINNER'
                    ? 'Легкий'
                    : difficulty === 'ADVANCED'
                    ? 'Средний'
                    : difficulty === 'EXPERT'
                    ? 'Сложный'
                    : 'Открытый',
        },
        {
            title: 'Статус',
            dataIndex: 'is_active',
            key: 'is_active',
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
            render: (text, record) => (
                <Button
                    type="primary"
                    onClick={() => {
                        setCurrentData(record)
                        setModalEditQuestionsBank(true)
                    }}
                >
                    Изменить
                </Button>
            ),
        },
    ]

    return (
        <>
            <QBEditModal
                open={modalEditQuestionsBank}
                setOpen={setModalEditQuestionsBank}
                dataList={currentData}
            />
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                rowKey="id"
                pagination={false}
                scroll={{ x: true }}
            />
        </>
    )
}

export default QuestionsBankTable
