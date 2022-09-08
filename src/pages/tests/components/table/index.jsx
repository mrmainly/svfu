import { useState } from 'react'
import { Button, Table } from 'antd'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import PropTypes from 'prop-types'

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
        {
            title: 'Название квалификации',
            dataIndex: 'name',
            key: 'name',
            // ...getColumnSearchProps('name'),
        },
        {
            title: 'Начало аттестации',
            dataIndex: 'date_start',
            key: 'date_start',
            render: (date_start, record) =>
                moment(record.exam.date_start).format('DD.MM.YYYY, hh:mm'),
            sorter: (a, b) => moment(a.exam.date_start) - moment(b.exam.date_start),
        },
        {
            title: 'Конец аттестации',
            dataIndex: ['exam', 'date_finish'],
            key: 'date_finish',
            render: (date_finish, record) =>
                moment(record.exam.date_finish).format('DD.MM.YYYY, hh:mm'),
            sorter: (a, b) => moment(a.exam.date_finish) - moment(b.exam.date_finish),
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
            sorter: (a, b) => a.time_exam - b.time_exam,
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
                scroll={{ x: true }}
            />
        </>
    )
}

AvailableTestTable.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
}

export default AvailableTestTable
