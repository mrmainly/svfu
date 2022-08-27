import { Table, message } from 'antd'

import { MyButton } from '../../../../components'

import { usePostDirectionMutation } from '../../../../services/DirectionService'

const AppilyngTable = ({ data, loading }) => {
    const [postDirection] = usePostDirectionMutation()

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
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (id, { status_application }) =>
                status_application ? (
                    <MyButton disabled type="text" style={{ backgroundColor: 'none' }}>
                        На рассмотрении
                    </MyButton>
                ) : (
                    <MyButton onClick={() => onSubmit(id)}>Подать заявление</MyButton>
                ),
        },
    ]

    return <Table columns={columns} dataSource={data} rowKey="id" loading={loading} />
}

export default AppilyngTable
