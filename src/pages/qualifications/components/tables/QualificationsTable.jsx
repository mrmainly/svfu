import { Table } from 'antd'
import { useNavigate } from 'react-router-dom'

import { MyButton } from '../../../../components'

const QualificationsTable = ({ data, loading, routes }) => {
    const navigate = useNavigate()

    const columns = [
        { title: '№ документа', dataIndex: 'name', key: 'name' },
        {
            title: 'Название квалификации',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Дата выдачи',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (id) => (
                <MyButton onClick={() => navigate(`${routes}/${id}`)}>Просмотр</MyButton>
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
        />
    )
}

export default QualificationsTable
