import { Table, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const CerificationResultsTable = ({ data, loading, routes }) => {
    const navigate = useNavigate()

    const columns = [
        { title: 'Квалифакиция', dataIndex: 'qualification', key: 'qualification' },
        { title: 'Дата и время начала', dataIndex: 'date', key: 'date' },
        { title: 'Затрачено времени', dataIndex: 'time', key: 'time' },
        { title: 'Статус', dataIndex: 'status', key: 'status' },
        { title: 'Баллы', dataIndex: 'points', key: 'points' },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (id) => (
                <Button
                    style={{
                        background: '#0D6EFD',
                        color: '#FFFFFF',
                        borderRadius: '4px',
                    }}
                    onClick={() => navigate(`${routes}/${id}`)}
                >
                    Просмотр
                </Button>
            ),
        },
    ]
    return <Table columns={columns} dataSource={data} rowKey="id" loading={loading} />
}

export default CerificationResultsTable
