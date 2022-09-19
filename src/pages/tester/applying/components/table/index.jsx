import { Table, message, Typography, Button } from 'antd'
import PropTypes from 'prop-types'

import { MyButton } from '../../../../../components'

import {
    usePostTesterApplicationMutation,
    usePutTesterApplicationMutation,
} from '../../../../../services/TesterService'
const { Text } = Typography

const AppilyngTable = ({ data, loading, setOrdering }) => {
    const [postDirection] = usePostTesterApplicationMutation()
    const [putDirection] = usePutTesterApplicationMutation()
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
    const onSubmit = (data) => {
        postDirection({ direction: data }).then((res) => {
            if (res.data) {
                message.success('Заявление подано')
            } else {
                message.error(res.error.data.errors[0])
            }
        })
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

AppilyngTable.propTypes = {
    loading: PropTypes.bool,
    data: PropTypes.array,
    setOrdering: PropTypes.func,
}

export default AppilyngTable
