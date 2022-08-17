import Table from 'antd/lib/table'
import ROUTES from '../../../routes'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const TestsBankTable = () => {
    const navigate = useNavigate()

    const data = [
        {
            id: 12,
            name: 'Название_тестирования',
            qualification: 'Название_квалификации',
            questions: 10,
        },
        {
            id: 12,
            name: 'Название_тестирования',
            qualification: 'Название_квалификации',
            questions: 10,
        },
    ]

    const columns = [
        { title: '№', dataIndex: 'id', key: 'id' },
        { title: 'Название квалификации', dataIndex: 'name', key: 'name' },
        { title: 'Квалификация', dataIndex: 'name', key: 'name' },
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
                    Перейти
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

export default TestsBankTable
