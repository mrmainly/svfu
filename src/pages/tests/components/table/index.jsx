import { useState } from 'react'
import { Button, Table } from 'antd'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import PropTypes from 'prop-types'

import TestDetail from '../modal/detail'
import ROUTES from '../../../../routes'
import { statusChoices } from '../../../../constants'
import useModal from '../../../../hooks/useModal'

const AvailableTestTable = ({ data, loading }) => {
    const navigate = useNavigate()
    const [ID, setID] = useState()

    const { open, handleClose, handleOpen } = useModal()
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Название квалификации',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Начало аттестации',
            dataIndex: 'date_start',
            key: 'date_start',
            render: (date_start, record) =>
                moment(record.exam.date_start).format('DD.MM.YYYY, HH:mm'),
        },
        {
            title: 'Конец аттестации',
            dataIndex: ['exam', 'date_finish'],
            key: 'date_finish',
            render: (date_finish, record) =>
                moment(record.exam.date_finish).format('DD.MM.YYYY, HH:mm'),
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
            render: (survey_status) => statusChoices[survey_status],
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
                            handleOpen()
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
            {open && <TestDetail open={open} handleClose={handleClose} ID={ID} />}
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
