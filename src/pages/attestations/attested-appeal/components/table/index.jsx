import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../../../../routes'

import moment from 'moment'

import Table from 'antd/lib/table'
import { Button, Input, Space } from 'antd'

import { uaStatus } from '../../../../../translation/StatusTranslation'

const AppealTable = ({ data, loading }) => {
    const navigate = useNavigate()
    console.log(data)
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
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <div>{uaStatus(status)}</div>,
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
            <Table columns={columns} dataSource={data} loading={loading} rowKey="id" />
        </>
    )
}

export default AppealTable
