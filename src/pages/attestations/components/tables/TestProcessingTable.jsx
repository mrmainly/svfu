import moment from 'moment'
import { useState } from 'react'
import { Button, Table, message } from 'antd'
import { useNavigate } from 'react-router-dom'

import ROUTES from '../../../../routes'
import TBEditModal from '../modals/tbeditmodal'
import { usePutMainExpertMutation } from '../../../../services/ExpertService'

const TestProcessingTable = ({ data, loading }) => {
    const [currentData, setCurrentData] = useState([])
    const [modalEditTB, setModalEditTB] = useState(false)
    const [putMainExpert] = usePutMainExpertMutation()

    const navigate = useNavigate()

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
            title: 'Роль',
            dataIndex: 'main_expert',
            key: 'main_expert',
            render: (main_expert) => (
                <div>{main_expert ? 'Предеседатель экспертов' : 'Эксперт'}</div>
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
            render: (status_result, record) =>
                (status_result === 'WAITING' ||
                    status_result === 'CHECKED_BY_FINISHED_BY_EXPERTS') &&
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
                    <Button type="primary" ghost>
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
            <Table columns={columns} dataSource={data} loading={loading} rowKey="id" />
            <TBEditModal open={modalEditTB} setOpen={setModalEditTB} dataList={currentData} />
        </>
    )
}

export default TestProcessingTable
