import moment from 'moment'
import { useState, useRef } from 'react'
import { Button, Table, Input, Space, message } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

import ROUTES from '../../../../routes'
import TBEditModal from '../modals/tbeditmodal'
import { usePutMainExpertMutation } from '../../../../services/ExpertService'
import { tableProcessingStatusResult } from '../../../../translation/StatusTranslation'

const TestProcessingTable = ({ data, loading }) => {
    const [currentData, setCurrentData] = useState([])
    const [modalEditTB, setModalEditTB] = useState(false)
    const [putMainExpert] = usePutMainExpertMutation()
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const searchInput = useRef()

    console.log(data)

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

    const navigate = useNavigate()

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
            dataIndex: 'direction',
            key: 'direction',
            ...getColumnSearchProps('direction'),
        },
        {
            title: 'ID аттестуемого',
            dataIndex: 'user',
            key: 'user',
            ...getColumnSearchProps('user'),
        },
        {
            title: 'Роль',
            dataIndex: 'main_expert',
            key: 'main_expert',
            render: (main_expert) => (
                <div>{main_expert ? 'Предеседатель экспертов' : 'Эксперт'}</div>
            ),
            filters: [
                {
                    text: 'Предеседатель экспертов',
                    value: true,
                },
                {
                    text: 'Эксперт',
                    value: false,
                },
            ],
            onFilter: (value, record) => record.main_expert === value,
        },
        {
            title: 'Дата выдачи теста',
            dataIndex: 'exam_date_start',
            key: 'exam_date_start',
            render: (exam_date_start) => moment(exam_date_start).format('DD.MM.YYYY, hh:mm'),
            sorter: (a, b) => moment(a.exam_date_start) - moment(b.exam_date_start),
        },
        {
            title: 'Статус',
            dataIndex: 'status_result',
            key: 'status_result',
            render: (status_result) => tableProcessingStatusResult(status_result),
            filters: [
                {
                    text: 'Ожидает проверки',
                    value: 'WAITING',
                },
                {
                    text: 'Отклонено',
                    value: 'REJECTED',
                },
                {
                    text: 'Отменено',
                    value: 'CANCELLED',
                },
                {
                    text: 'Проверяется экспертами',
                    value: 'CHECKED_BY_EXPERTS',
                },
                {
                    text: 'Проверено экспертами',
                    value: 'FINISHED_BY_EXPERTS',
                },
                {
                    text: 'Проверено экспертами',
                    value: 'CHECKED_BY_MAIN_EXPERT',
                },
                {
                    text: 'Эксперт (пред.) проверяет',
                    value: 'FINISHED_BY_MAIN_EXPERT',
                },
                {
                    text: 'Проверяется модераторами',
                    value: 'CHECKED_BY_MODERATORS',
                },
                {
                    text: 'Проверено модераторами',
                    value: 'FINISHED_BY_MODERATORS',
                },
                {
                    text: 'Модератор (пред.) проверяет',
                    value: 'CHECKED_BY_MAIN_MODERATOR',
                },
                {
                    text: 'Проверено модератором (пред.)',
                    value: 'FINISHED_BY_MAIN_MODERATOR',
                },
                {
                    text: 'Проверено',
                    value: 'FINISHED',
                },
            ],
            onFilter: (value, record) => record.status_result.indexOf(value) === 0,
        },
        {
            title: 'Действие',
            dataIndex: 'status_result',
            key: 'x',
            render: (status_result, record) =>
                (status_result === 'WAITING' || status_result === 'CHECKED_BY_EXPERTS') &&
                record.is_reviewed === false &&
                record.main_expert === false ? (
                    <Button
                        type="primary"
                        onClick={() => {
                            navigate(ROUTES.EXPERT, {
                                state: {
                                    id: record.id,
                                },
                            })
                            localStorage.setItem(
                                'side_bar_data_ex_mo',
                                JSON.stringify(record, null, '\t')
                            )
                        }}
                    >
                        Проверить
                    </Button>
                ) : status_result === 'FINISHED' ? (
                    <Button type="primary" ghost disabled>
                        Проверено
                    </Button>
                ) : status_result === 'FINISHED_BY_EXPERTS' && record.main_expert === true ? (
                    <Button
                        type="primary"
                        onClick={() => {
                            putMainExpert({ id: record.id }).then((res) => {
                                if (res.data) {
                                    navigate(ROUTES.EXPERT, {
                                        state: {
                                            id: record.id,
                                        },
                                    })
                                    localStorage.setItem(
                                        'side_bar_data_ex_mo',
                                        JSON.stringify(record, null, '\t')
                                    )
                                } else {
                                    message.error('Вы не являетесь председателем экспертов')
                                }
                            })
                        }}
                    >
                        Проверить
                    </Button>
                ) : status_result === 'CHECKED_BY_MAIN_EXPERT' && record.main_expert === true ? (
                    <Button
                        type="primary"
                        onClick={() => {
                            navigate(ROUTES.EXPERT, {
                                state: {
                                    id: record.id,
                                },
                            })
                            localStorage.setItem(
                                'side_bar_data_ex_mo',
                                JSON.stringify(record, null, '\t')
                            )
                        }}
                    >
                        Продолжить
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
                scroll={{ x: true }}
            />
            {modalEditTB && (
                <TBEditModal open={modalEditTB} setOpen={setModalEditTB} dataList={currentData} />
            )}
        </>
    )
}

export default TestProcessingTable
