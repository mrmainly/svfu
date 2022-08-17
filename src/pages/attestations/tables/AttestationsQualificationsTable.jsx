import Table from 'antd/lib/table'
import ROUTES from '../../../routes'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const AttestationsQualificationsTable = () => {
    const navigate = useNavigate()

    const data = [
        {
            id: 1,
            name: 'Название_квалификации',
            questions: '125',
        },
        {
            id: 1,
            name: 'Название_квалификации',
            questions: '125',
        },
    ]

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Название квалификации', dataIndex: 'name', key: 'name' },
        {
            title: 'Вопросов',
            dataIndex: 'questions',
            key: 'questions',
        },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (id) => (
                <Button
                    type="primary"
                    // onClick={() => {
                    //     navigate(ROUTES.USERS_DETAIL + `/${id}`)
                    // }}
                >
                    Проверить
                </Button>
            ),
        },
    ]

    return (
        <>
            <Table columns={columns} dataSource={data} rowKey="id" />
        </>
    )
}

export default AttestationsQualificationsTable
