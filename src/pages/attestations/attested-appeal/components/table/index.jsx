import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import moment from 'moment'

import { Button, Table } from 'antd'

import { userAppilicationStatus } from '../../../../../translation/StatusTranslation'
import ROUTES from '../../../../../routes'

const AppealTable = ({ data, loading }) => {
    const navigate = useNavigate()

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Название тестирования',
            dataIndex: 'survey_name',
            key: 'survey_name',
        },
        {
            title: 'ID аттесту-го',
            dataIndex: 'user_id',
            key: 'user_id',
        },
        {
            title: 'Дата начала теста',
            dataIndex: 'date_start',
            key: 'date_start',
            render: (date_start) => moment(date_start).format('DD.MM.YYYY, hh:mm'),
            sorter: (a, b) => moment(a.date_start) - moment(b.date_start),
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <div>{userAppilicationStatus(status)}</div>,
            filters: [
                {
                    text: 'Принято',
                    value: 'APPROVED',
                },
                {
                    text: 'Ожидание',
                    value: 'WAITING',
                },
                {
                    text: 'Отклонен',
                    value: 'REJECTED',
                },
                {
                    text: 'Завершен',
                    value: 'FINISHED',
                },
                {
                    text: 'Отменен',
                    value: 'CANCELLED',
                },
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,
        },
        {
            title: 'Баллы',
            dataIndex: 'score_first_part',
            key: 'score_first_part',
        },
        {
            title: 'Действие',
            dataIndex: 'status',
            key: 'x',
            render: (status, record) =>
                status === 'WAITING' ? (
                    <Button
                        type="primary"
                        onClick={() => {
                            navigate(ROUTES.MODERATOR_APPEAL, {
                                state: {
                                    id: record.id,
                                },
                            })
                            localStorage.setItem(
                                'side_bar_data_ex_mo',
                                JSON.stringify(record.result, null, '\t')
                            )
                        }}
                    >
                        Просмотр
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
            />
        </>
    )
}

AppealTable.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
}

export default AppealTable
