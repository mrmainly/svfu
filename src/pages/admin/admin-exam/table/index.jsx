import React from 'react'

import { Table, Button } from 'antd'
import moment from 'moment'
import PropTypes from 'prop-types'

const AdminExamTable = ({ data, loading, setOpen, setModalData }) => {
    const columns = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'id',
            render: (id) => (id ? id : '-'),
        },
        {
            title: 'Название тестирования',
            dataIndex: 'name',
            key: 'name',
            render: (name) => (name ? name : '-'),
        },
        {
            title: 'Группа',
            dataIndex: 'test_group',
            key: 'test_group',
            render: (test_group) => (test_group ? test_group : '-'),
        },
        {
            title: 'Аттес-ых',
            dataIndex: 'testers_count_from_group',
            key: 'testers_count_from_group',
            render: (testers_count_from_group) =>
                testers_count_from_group ? testers_count_from_group : '0',
        },
        {
            title: 'Начало',
            dataIndex: 'date_start',
            key: 'date_start',
            render: (date_start) =>
                date_start ? moment(date_start).format('DD.MM.YYYY, HH:mm') : '-',
        },
        {
            title: 'Конец',
            dataIndex: 'date_finish',
            key: 'date_finish',
            render: (date_finish) =>
                date_finish ? moment(date_finish).format('DD.MM.YYYY, HH:mm') : '-',
        },
        {
            title: 'Статус',
            dataIndex: 'exam_status',
            key: 'exam_status',

            render: (exam_status) =>
                exam_status === 'WAITING'
                    ? 'Ожидает'
                    : exam_status === 'IN_PROGRESS'
                    ? 'Идет тест'
                    : exam_status === 'COMPLETED'
                    ? 'Завершен'
                    : exam_status === 'CANCELLED'
                    ? 'Отменен'
                    : '-',
        },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (text, record) => (
                <Button
                    type="primary"
                    onClick={() => {
                        setOpen(true)
                        setModalData(record)
                    }}
                >
                    Просмотр
                </Button>
            ),
        },
    ]
    return (
        <Table
            dataSource={data?.results}
            loading={loading}
            columns={columns}
            rowKey="id"
            scroll={{ x: true }}
            pagination={false}
        />
    )
}

AdminExamTable.propTypes = {
    data: PropTypes.object,
    loading: PropTypes.bool,
    setOpen: PropTypes.func,
    setModalData: PropTypes.func,
}

export default AdminExamTable
