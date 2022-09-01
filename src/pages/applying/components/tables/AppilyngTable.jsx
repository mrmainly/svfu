import { Table, message, Typography, Button } from 'antd'

import { MyButton } from '../../../../components'

import {
    usePostDirectionMutation,
    usePutDirectionMutation,
} from '../../../../services/DirectionService'

const { Text } = Typography

const AppilyngTable = ({ data, loading }) => {
    const [postDirection] = usePostDirectionMutation()
    const [putDirection] = usePutDirectionMutation()

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
        { title: 'ID', dataIndex: 'id', key: 'id' },
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
                    <Button disabled onClick={() => putDirection(id)}>
                        Отмена
                    </Button>
                ) : (
                    <MyButton onClick={() => onSubmit(id)}>Подать заявление</MyButton>
                ),
        },
    ]

    return <Table columns={columns} dataSource={data} rowKey="id" loading={loading} />
}

export default AppilyngTable
