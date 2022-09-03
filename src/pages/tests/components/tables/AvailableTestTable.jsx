import { useState } from 'react'
import { Table, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

import TestDetail from '../modal/detail'
import ROUTES from '../../../../routes'
import { testResultStatus } from '../../../../translation/StatusTranslation'

const AvailableTestTable = ({ data, loading }) => {
    const navigate = useNavigate()
    const [modalATT, setModalATT] = useState(false)
    const [ID, setID] = useState()
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.id - b.id,
        },
        { title: 'Название квалификации', dataIndex: 'name', key: 'name' },
        {
            title: 'Начало аттестации',
            dataIndex: 'exam',
            key: 'exam',
            render: (exam) => moment(exam.date_start).format('DD.MM.YYYY, hh:mm'),
        },
        {
            title: 'Конец аттестации',
            dataIndex: 'exam',
            key: 'exam',
            render: (exam) => moment(exam.date_finish).format('DD.MM.YYYY, hh:mm'),
        },
        {
            title: 'Время',
            dataIndex: 'time_exam',
            key: 'time_exam',
            render: (time_exam) => (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                    }}
                >
                    <div>{time_exam} мин</div>
                </div>
            ),
        },
        {
            title: 'Статус',
            dataIndex: 'survey_status',
            key: 'survey_status',
            render: (survey_status) => testResultStatus(survey_status),
            filters: [
                {
                    text: 'Ожидание',
                    value: 'WAITING',
                },
                {
                    text: 'На рассмотрении',
                    value: 'ON_REVIEW',
                },
                {
                    text: 'Рассмотрен',
                    value: 'REVIEWED',
                },
                {
                    text: 'Недоступно',
                    value: 'UNAVAILABLE',
                },
            ],
            onFilter: (value, record) => record.survey_status.indexOf(value) === 0,
        },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (id, record) =>
                record.survey_status === 'WAITING' ? (
                    <Button
                        type="primary"
                        onClick={() => {
                            setID(id)
                            setModalATT(true)
                        }}
                    >
                        Начать
                    </Button>
                ) : record.survey_status === 'REVIEWED' ? (
                    <Button
                        type="primary"
                        ghost
                        onClick={() => navigate(`${ROUTES.TEST_RESULT}/${id}`)}
                    >
                        Результат
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
            {modalATT && <TestDetail open={modalATT} setOpen={setModalATT} ID={ID} />}
            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                loading={loading}
                pagination={false}
                style={{ overflow: 'auto' }}
            />
        </>
    )
}

export default AvailableTestTable
