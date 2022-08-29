import { useState } from 'react'
import { Table, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

import { MyButton } from '../../../../components'
import TestDetail from '../modal/detail'
import ROUTES from '../../../../routes'

const AvailableTestTable = ({ data, loading }) => {
    const navigate = useNavigate()
    const [modalATT, setModalATT] = useState(false)
    const [ID, setID] = useState()
    console.log('data', data)
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
            dataIndex: 'created',
            key: 'created',
            render: (created) => moment(created).format('DD.MM.YYYY, hh:mm'),
        },
        {
            title: 'Конец аттестации',
            dataIndex: 'created',
            key: 'created',
            render: (created) => moment(created).format('DD.MM.YYYY, hh:mm'),
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
            render: (survey_status) =>
                survey_status === 'WAITING'
                    ? 'Ожидание'
                    : survey_status === 'ON_REVIEW'
                    ? 'На рассмотрении'
                    : survey_status === 'REVIEWED'
                    ? 'Рассмотрен'
                    : 'Недоступно',
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
            <TestDetail open={modalATT} setOpen={setModalATT} ID={ID} />
            <Table columns={columns} dataSource={data} rowKey="id" loading={loading} />
        </>
    )
}

export default AvailableTestTable
