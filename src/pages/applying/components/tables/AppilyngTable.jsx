import { Table, message, Typography, Button } from 'antd'

import { MyButton } from '../../../../components'

import {
    usePostDirectionMutation,
    usePutDirectionMutation,
} from '../../../../services/DirectionService'

const { Text } = Typography

const AppilyngTable = ({ data, loading, refetchFunc }) => {
    const [postDirection] = usePostDirectionMutation()
    const [putDirection] = usePutDirectionMutation()

    const onSubmit = (data) => {
        postDirection({ direction: data }).then((res) => {
            if (res.data) {
                message.success('Заявление подано')
                refetchFunc()
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
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.id - b.id,
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
            render: (status_application) =>
                status_application ? <Text>На рассмотрении</Text> : <Text>Не отправлен</Text>,
        },

        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (id, { status_application }) =>
                status_application ? (
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
                                    refetchFunc()
                                    message.success('Заявление отменено')
                                } else {
                                    message.error(res.error.data.errors[0])
                                }
                            })
                        }}
                    >
                        Отмена
                    </Button>
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
            style={{ overflow: 'auto' }}
            pagination={false}
        />
    )
}

export default AppilyngTable
