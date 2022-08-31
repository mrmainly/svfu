import moment from 'moment'
import { useState } from 'react'
import TBEditModal from '../modals/tbeditmodal'
import Table from 'antd/lib/table'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../../../routes'

const TestProcessingTable = ({ data, loading }) => {
    const [currentData, setCurrentData] = useState([])
    const [modalEditTB, setModalEditTB] = useState(false)
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
                status_result === 'WAITING' ? (
                    <>
                        <Button
                            type="primary"
                            onClick={() => {
                                navigate(ROUTES.EXPERT, {
                                    state: {
                                        surveyquest: record,
                                        id: record.id,
                                    },
                                })
                                localStorage.setItem(
                                    'side_bar_data_expert',
                                    JSON.stringify(record, null, '\t')
                                )
                            }}
                        >
                            Проверить
                        </Button>
                    </>
                ) : status_result === 'FINISHED' ? (
                    <Button
                        type="primary"
                        ghost
                        // onClick={() => {
                        //     const itemData = data?.filter((e) => e.id === id)
                        //     setCurrentData(itemData)
                        //     setModalEditTB(true)
                        // }}
                    >
                        Проверено
                    </Button>
                ) : (
                    <Button
                        type="primary"
                        disabled
                        // onClick={() => {
                        //     const itemData = data?.filter((e) => e.id === id)
                        //     setCurrentData(itemData)
                        //     setModalEditTB(true)
                        // }}
                    >
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
