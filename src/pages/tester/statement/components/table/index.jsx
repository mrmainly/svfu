import { Table, message, Typography, Button } from 'antd'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import { MyButton } from '../../../../../components'
import {
    usePostStatementMutation,
    usePutStatementMutation,
} from '../../../../../services/tester/Statement'

const { Text } = Typography

const StatementTable = ({ data, loading, setOrdering }) => {
    const [postDirection] = usePostStatementMutation()
    const [putDirection] = usePutStatementMutation()

    const { post_status } = useSelector((state) => state.profile_slice)

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
    const onSubmit = (id) => {
        if (post_status === 'normal') {
            postDirection({ id: id }).then((res) => {
                if (res.data) {
                    message.success('Заявление подано')
                } else {
                    message.error(res.error.data.errors[0])
                }
            }).catch(() => {
                message.error('Что то пошло не так')
            })
        } else {
            message.error('Вы не заполнили поле должность в профиле')
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
            title: 'Название квалификации',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Статус',
            dataIndex: 'status_application',
            key: 'status_application',
            render: (status_application, { status_approved }) =>
                status_approved && !status_application ? (
                    <Text>Принят</Text>
                ) : !status_approved && status_application ? (
                    <Text>На рассмотрении</Text>
                ) : (
                    <Text>Не отправлен</Text>
                ),
        },

        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (id, { status_approved, status_application }) =>
                !status_approved && status_application ? (
                    <Button
                        style={{
                            width: 'max-content',
                            border: 4,
                        }}
                        size="large"
                        type="danger"
                        onClick={() => {
                            putDirection(id).then((res) => {
                                if (res.data) {
                                    message.success('Заявление отменено')
                                } else {
                                    message.error(res.error.data.errors[0])
                                }
                            })
                        }}
                    >
                        Отмена
                    </Button>
                ) : status_approved && !status_application ? (
                    <MyButton disabled>Недоступно</MyButton>
                ) : (
                    <MyButton onClick={() => onSubmit(id)}>Подать заявление</MyButton>
                ),
        },
    ]

    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            loading={loading}
            scroll={{ x: true }}
            pagination={false}
            onChange={onTableChange}
        />
    )
}

StatementTable.propTypes = {
    loading: PropTypes.bool,
    data: PropTypes.array,
    setOrdering: PropTypes.func,
}

export default StatementTable
