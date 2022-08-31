import moment from 'moment'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import Table from 'antd/lib/table'
import ROUTES from '../../../../routes'
import { DynamicPathSlice } from '../../../../reducers/DynamicPathSlice'

const TestResultTable = ({ data, loading }) => {
    const { handlePath, handleFullName, handleRole, handleCurrentPath } = DynamicPathSlice.actions
    const [currentData, setCurrentData] = useState([])
    const [modalEditTB, setModalEditTB] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const columns = [
        { title: '№', dataIndex: 'id', key: 'id' },
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
            title: 'Дата выдачи теста',
            dataIndex: 'exam_date_start',
            key: 'exam_date_start',
            render: (exam_date_start) => moment(exam_date_start).format('DD.MM.YYYY, hh:mm'),
        },
        {
            title: 'Статус',
            dataIndex: 'status_result',
            key: 'status_result',
            render: (status_result) =>
                status_result === 'WAITING'
                    ? 'Ожидает проверки'
                    : status_result === 'REJECTED'
                    ? 'Отклонено'
                    : status_result === 'CANCELLED'
                    ? 'Отменено'
                    : status_result === 'CHECKED_BY_EXPERTS'
                    ? 'Проверяется экспертами'
                    : status_result === 'FINISHED_BY_EXPERTS'
                    ? 'Проверено экспертами'
                    : status_result === 'CHECKED_BY_MAIN_EXPERT'
                    ? 'Эксперт (пред.) проверяет'
                    : status_result === 'FINISHED_BY_MAIN_EXPERT'
                    ? 'Проверено экспертом (пред.)'
                    : status_result === 'CHECKED_BY_MODERATORS'
                    ? 'Проверяется модераторами'
                    : status_result === 'FINISHED_BY_MODERATORS'
                    ? 'Проверено модераторами'
                    : status_result === 'CHECKED_BY_MAIN_MODERATOR'
                    ? 'Модератор (пред.) проверяет'
                    : status_result === 'FINISHED_BY_MAIN_MODERATOR'
                    ? 'Проверено модератором (пред.)'
                    : status_result === 'FINISHED'
                    ? 'Проверено'
                    : null,
        },
        {
            title: 'Действие',
            dataIndex: 'status_result',
            key: 'x',
            render: (status_result, record, direction) =>
                status_result === 'WAITING' ? (
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
                            dispatch(handlePath(ROUTES.MODERATOR_TEST_RESULT))
                            dispatch(handleRole(''))
                            dispatch(handleFullName(record.survey.name))
                            dispatch(handleCurrentPath(ROUTES.MODERATOR))
                        }}
                    >
                        Проверить
                    </Button>
                ) : status_result === 'FINISHED' ? (
                    <Button type="primary" ghost>
                        Проверено
                    </Button>
                ) : status_result === 'FINISHED_BY_EXPERTS' ? (
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
                            dispatch(handlePath(ROUTES.MODERATOR_TEST_RESULT))
                            dispatch(handleRole(''))
                            dispatch(handleFullName(record.survey.name))
                            dispatch(handleCurrentPath(ROUTES.MODERATOR))
                        }}
                    >
                        Начать
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
            <Table columns={columns} dataSource={data} loading={loading} rowKey="id" />
        </>
    )
}

export default TestResultTable
