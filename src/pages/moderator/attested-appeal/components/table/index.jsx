import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import moment from 'moment'

import { Button, Table } from 'antd'

import { statusChoices } from '../../../../../constants'
import ROUTES from '../../../../../routes'

const AppealTable = ({ data, loading, setOrdering }) => {
    const navigate = useNavigate()
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
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: true,
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
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <div>{statusChoices[status]}</div>,
        },
        {
            title: 'Тип теста',
            dataIndex: 'score_first_part',
            key: 'score_first_part',
            render: (_, record) => <div>{record?.result.survey.unit_type}</div>,
        },
        {
            title: 'Действие',
            dataIndex: 'status',
            key: 'x',
            render: (status, record) =>
                status === 'WAITING' && record.result.main_moderator ? (
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
                onChange={onTableChange}
                scroll={{ x: true }}
            />
        </>
    )
}

AppealTable.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    setOrdering: PropTypes.func,
}

export default AppealTable
