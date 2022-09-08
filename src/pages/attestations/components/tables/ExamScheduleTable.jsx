import React from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import { Button, Table } from 'antd'

import { testResultStatus } from '../../../../translation/StatusTranslation'

const ExamScheduleTable = ({
    data,
    loading,
    setOpenEditModal,
    setCurrentData,
    setViewSurveyModalOpen,
    setCurrentSurveyId,
}) => {
    const columns = [
        {
            title: '№',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            defaultSortOrder: 'ascend',
        },
        {
            title: 'Название тестирования',
            dataIndex: 'name',
            key: 'name',
            render: (name, record) => (
                <div
                    style={{ color: '#2F80ED', textDecoration: 'underline', cursor: 'pointer' }}
                    onClick={() => {
                        setCurrentSurveyId(record.unit)
                        setViewSurveyModalOpen(true)
                    }}
                >
                    {name}
                </div>
            ),
        },
        {
            title: 'Группа',
            dataIndex: 'test_group',
            key: 'test_group',
        },
        {
            title: 'Аттес-ых',
            dataIndex: 'testers_count',
            key: 'testers_count',
        },
        {
            title: 'Начало',
            dataIndex: 'date_start',
            key: 'date_start',
            render: (date_start) => moment(date_start).format('DD.MM.YYYY, hh:mm'),
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Конец',
            dataIndex: 'date_finish',
            key: 'date_finish',
            render: (date_finish) => moment(date_finish).format('DD.MM.YYYY, hh:mm'),
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Статус',
            dataIndex: 'exam_status',
            key: 'exam_status',
            render: (exam_status) => testResultStatus(exam_status),
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
            onFilter: (value, record) => record.exam_status.indexOf(value) === 0,
        },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (text, record) => (
                <Button
                    type="primary"
                    onClick={() => {
                        setCurrentData(record)
                        setOpenEditModal(true)
                    }}
                >
                    Просмотр
                </Button>
            ),
        },
    ]

    return (
        <>
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

ExamScheduleTable.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    setOpenEditModal: PropTypes.func,
    setCurrentData: PropTypes.func,
    setViewSurveyModalOpen: PropTypes.func,
    setCurrentSurveyId: PropTypes.func,
}

export default ExamScheduleTable
