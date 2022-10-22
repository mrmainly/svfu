import moment from 'moment'
import { Button, Table, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import ROUTES from '../../../../../routes'
import { usePutMainExpertMutation } from '../../../../../services/expert/Surveys'
import { statusChoices } from '../../../../../constants'

const TestProcessingTable = ({ data, loading, setOrdering }) => {
    const [putMainExpert] = usePutMainExpertMutation()
    console.log(data)
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
            title: '№',
            dataIndex: 'id',
            key: 'id',
            sorter: true,
        },
        {
            title: 'Название тестирования',
            dataIndex: 'direction',
            key: 'direction',
        },
        {
            title: 'Тип',
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
            render: (status_result) => statusChoices[status_result],
        },
        {
            title: 'Действие',
            dataIndex: 'status_result',
            key: 'x',
            render: (status_result, record) =>
                (status_result === 'WAITING' || status_result === 'CHECKED_BY_EXPERTS') &&
                record.is_reviewed === false &&
                record.main_expert === false ? (
                    <Button
                        type="primary"
                        onClick={() => {
                            navigate(ROUTES.EXPERT, {
                                state: {
                                    id: record.id,
                                },
                            })
                            localStorage.setItem(
                                'side_bar_data_ex_mo',
                                JSON.stringify(record, null, '\t')
                            )
                        }}
                    >
                        Проверить
                    </Button>
                ) : status_result === 'FINISHED' ? (
                    <Button type="primary" ghost disabled>
                        Проверено
                    </Button>
                ) : status_result === 'FINISHED_BY_EXPERTS' && record.main_expert === true ? (
                    <Button
                        type="primary"
                        onClick={() => {
                            putMainExpert({ id: record.id }).then((res) => {
                                if (res.data) {
                                    navigate(ROUTES.EXPERT, {
                                        state: {
                                            id: record.id,
                                        },
                                    })
                                    localStorage.setItem(
                                        'side_bar_data_ex_mo',
                                        JSON.stringify(record, null, '\t')
                                    )
                                } else {
                                    message.error('Вы не являетесь председателем экспертов')
                                }
                            })
                        }}
                    >
                        Проверить
                    </Button>
                ) : status_result === 'CHECKED_BY_MAIN_EXPERT' && record.main_expert === true ? (
                    <Button
                        type="primary"
                        onClick={() => {
                            navigate(ROUTES.EXPERT, {
                                state: {
                                    id: record.id,
                                },
                            })
                            localStorage.setItem(
                                'side_bar_data_ex_mo',
                                JSON.stringify(record, null, '\t')
                            )
                        }}
                    >
                        Продолжить
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
                scroll={{ x: true }}
                onChange={onTableChange}
            />
        </>
    )
}

TestProcessingTable.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    setOrdering: PropTypes.func,
}

export default TestProcessingTable
