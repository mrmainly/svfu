import Table from 'antd/lib/table'
import ROUTES from '../../../../routes'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const UsersTable = () => {
    const navigate = useNavigate()

    const data = [
        {
            id: 1,
            fio: 'Иван Петров',
            currentlCassification: 'Дворник 1 разряда',
            role: 'Аттестуемый',
        },
        {
            id: 1,
            fio: 'Иван Петров',
            currentlCassification: 'Дворник 1 разряда',
            role: 'Тьютор',
        },
    ]

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'ФИО', dataIndex: 'fio', key: 'fio' },
        {
            title: 'Роль',
            dataIndex: 'role',
            key: 'role',
            filters: [
                {
                    text: 'Аттестуемый',
                    value: 'Аттестуемый',
                },
                {
                    text: 'Тьютор',
                    value: 'Тьютор',
                },
            ],
            onFilter: (value, record) => record.role === value,
        },
        {
            title: 'Текущая аттестация',
            dataIndex: 'currentlCassification',
            key: 'currentlCassification',
        },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (id) => (
                <Button
                    type="primary"
                    onClick={() => {
                        navigate(ROUTES.USERS_DETAIL + `/${id}`)
                    }}
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

export default UsersTable
