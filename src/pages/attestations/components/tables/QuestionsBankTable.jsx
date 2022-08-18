import Table from 'antd/lib/table'
import ROUTES from '../../../../routes'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const QuestionsBankTable = () => {
    const navigate = useNavigate()

    const data = [
        {
            id: 12,
            name: 'Квалификация',
            type: 'Один из нескольких',
            difficult: 'Средняя',
        },
        {
            id: 12,
            name: 'Название квалификации',
            type: 'Практическая часть',
            difficult: 'Открытый вопрос',
        },
    ]

    const columns = [
        { title: '№', dataIndex: 'id', key: 'id' },
        { title: 'Название валификации', dataIndex: 'name', key: 'name' },
        { title: 'Тип вопросв', dataIndex: 'type', key: 'type' },
        {
            title: 'Сложность',
            dataIndex: 'difficult',
            key: 'difficult',
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

export default QuestionsBankTable
