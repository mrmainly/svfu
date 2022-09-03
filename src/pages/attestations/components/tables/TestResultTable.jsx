import moment from 'moment'
import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Table, Input, Space, message } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import ROUTES from '../../../../routes'
import { DynamicPathSlice } from '../../../../reducers/DynamicPathSlice'
import { usePutMainModeratorMutation } from '../../../../services/ModeratorService'
import { tableProcessingStatusResult } from '../../../../translation/StatusTranslation'

const TestResultTable = ({ data, loading }) => {
    const { handlePath, handleFullName, handleRole, handleCurrentPath } = DynamicPathSlice.actions
    const [currentData, setCurrentData] = useState([])
    const [modalEditTB, setModalEditTB] = useState(false)
    const [putMainModerator] = usePutMainModeratorMutation()
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const searchInput = useRef()
    const navigate = useNavigate()

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

    const dispatch = useDispatch()
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
        },
        {
            title: 'ID аттестуемого',
            dataIndex: 'user',
            key: 'user',
            ...getColumnSearchProps('user'),
        },
        {
            title: 'Роль',
            dataIndex: 'main_moderator',
            key: 'main_moderator',
            render: (main_moderator) => (
                <div>{main_moderator ? 'Предеседатель модераторов' : 'Модератор'}</div>
            ),
            filters: [
                {
                    text: 'Модератор',
                    value: false,
                },
                {
                    text: 'Предеседатель модераторов',
                    value: true,
                },
            ],
            onFilter: (value, record) => record.main_moderator === value,
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
            render: (status_result, record, direction) =>
                (status_result === 'FINISHED_BY_MAIN_EXPERT' ||
                    status_result === 'CHECKED_BY_MODERATORS') &&
                record.is_reviewed === false &&
                record.main_moderator === false ? (
                    <Button
                        style={{ width: '100%' }}
                        type="primary"
                        onClick={() => {
                            navigate(ROUTES.MODERATOR, {
                                state: {
                                    id: record.id,
                                },
                            })
                            localStorage.setItem(
                                'side_bar_data_ex_mo',
                                JSON.stringify(record, null, '\t')
                            )
                            dispatch(handlePath(ROUTES.MODERATOR_TEST_RESULT))
                            dispatch(handleRole(''))
                            dispatch(handleFullName(record.survey.name))
                            dispatch(handleCurrentPath(ROUTES.MODERATOR))
                        }}
                    >
                        Проверить
                    </Button>
                ) : status_result === 'FINISHED' ? (
                    <Button style={{ width: '100%' }} type="text">
                        Проверено
                    </Button>
                ) : status_result === 'FINISHED_BY_MODERATORS' && record.main_moderator === true ? (
                    <Button
                        style={{ width: '100%' }}
                        type="primary"
                        ghost
                        onClick={() => {
                            putMainModerator({ id: record.id }).then((res) => {
                                if (res.data) {
                                    navigate(ROUTES.MODERATOR, {
                                        state: {
                                            id: record.id,
                                        },
                                    })
                                    localStorage.setItem(
                                        'side_bar_data_ex_mo',
                                        JSON.stringify(record, null, '\t')
                                    )
                                    dispatch(handlePath(ROUTES.MODERATOR_TEST_RESULT))
                                    dispatch(handleRole(''))
                                    dispatch(handleFullName(record.survey.name))
                                    dispatch(handleCurrentPath(ROUTES.MODERATOR))
                                } else {
                                    message.error('Вы не являетесь председателем модераторов')
                                }
                            })
                        }}
                    >
                        Начать
                    </Button>
                ) : status_result === 'CHECKED_BY_MAIN_MODERATOR' &&
                  record.main_moderator === true ? (
                    <Button
                        type="primary"
                        onClick={() => {
                            navigate(ROUTES.MODERATOR, {
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
                    <Button style={{ width: '100%' }} type="primary" disabled>
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
        </>
    )
}

export default TestResultTable
