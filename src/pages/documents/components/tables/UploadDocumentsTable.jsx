import { useState, useRef } from 'react'
import Table from 'antd/lib/table'
import { Button, Input, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import UDEditModal from '../modals/udeditmodal'

const UploadDocumentsTable = ({ data, loading }) => {
    const [currentData, setCurrentData] = useState([])
    const [modalEditDocs, setModalEditDocs] = useState(false)

    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const searchInput = useRef(null)

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
                    placeholder={`Search ${dataIndex}`}
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
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            })
                            setSearchText(selectedKeys[0])
                            setSearchedColumn(dataIndex)
                        }}
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
                        Сброс
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
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100)
            }
        },
    })
    const columns = [
        {
            title: 'Документ',
            dataIndex: 'file',
            key: 'file',
            render: (file) => (
                <a href={file} target="_blank">
                    {decodeURI(file).split('/')[5]}
                </a>
            ),
        },
        {
            title: 'Тип документа',
            dataIndex: 'document_type',
            key: 'document_type',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.document_type.length - b.document_type.length,
            filters: [
                {
                    text: 'Диплом',
                    value: 'DIPLOMA',
                },
                {
                    text: 'Паспорт',
                    value: 'PASSPORT',
                },
                {
                    text: 'Образование, ученое звание и учёные степени',
                    value: 'TITLESDEGREES',
                },
            ],
            onFilter: (value, record) => record.document_type === value,
            render: (document_type) =>
                document_type === 'DIPLOMA'
                    ? 'Диплом'
                    : document_type === 'PASSPORT'
                    ? 'Паспорт'
                    : document_type === 'TITLESDEGREES'
                    ? 'Образование, ученое звание и учёные степени'
                    : null,
        },
        {
            title: 'Описание',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
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
                        setModalEditDocs(true)
                    }}
                >
                    Изменить
                </Button>
            ),
        },
    ]
    return (
        <>
            <Table columns={columns} dataSource={data} loading={loading} rowKey="id" />
            <UDEditModal open={modalEditDocs} setOpen={setModalEditDocs} dataList={currentData} />
        </>
    )
}

export default UploadDocumentsTable
