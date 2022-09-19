import moment from 'moment'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Table, message } from 'antd'
import PropTypes from 'prop-types'

import ROUTES from '../../../../../routes'
import { DynamicPathSlice } from '../../../../../reducers/DynamicPathSlice'
import { usePutMainModeratorMutation } from '../../../../../services/ModeratorService'
import { statusChoices } from '../../../../../constants'

const TestResultTable = ({ data, loading, setOrdering }) => {
    const { handlePath, handleFullName, handleRole, handleCurrentPath } = DynamicPathSlice.actions
    const [putMainModerator] = usePutMainModeratorMutation()
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const onTableChange = (newPagination, filters, sorter) => {
        if (sorter?.order === 'descend') {
            {
                setOrdering('-id')
            }
        } else if (sorter?.order === 'ascend') {
            {
                setOrdering('id')
            }
        } else {
            {
                setOrdering('')
            }
        }
    }
    const columns = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'id',
            sorter: true,
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
        },
        {
            title: 'Роль',
            dataIndex: 'main_moderator',
            key: 'main_moderator',
            render: (main_moderator) => (
                <div>{main_moderator ? 'Предеседатель модераторов' : 'Модератор'}</div>
            ),
        },
        {
            title: 'Дата выдачи теста',
            dataIndex: 'exam_date_start',
            key: 'exam_date_start',
            render: (exam_date_start) => moment(exam_date_start).format('DD.MM.YYYY, hh:mm'),
        },
        {
            title: 'Статус',
            dataIndex: 'status_result',
            key: 'status_result',
            render: (status_result) => statusChoices[status_result],
        },
        {
            title: 'Действие',
            dataIndex: 'status_result',
            key: 'x',
            render: (status_result, record) =>
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
                onChange={onTableChange}
            />
        </>
    )
}

TestResultTable.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    setOrdering: PropTypes.func,
}

export default TestResultTable
