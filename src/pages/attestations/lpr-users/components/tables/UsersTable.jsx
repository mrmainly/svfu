import Table from 'antd/lib/table'
import ROUTES from '../../../../../routes'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useGetAttestationUsersQuery } from '../../../../../services/AttestationProtocolService'

const UsersTable = () => {
    const navigate = useNavigate()

    const { data, isLoading } = useGetAttestationUsersQuery()
    console.log(data)

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'ФИО', dataIndex: 'full_name', key: 'full_name' },
        {
            title: 'Текущая аттестация',
            dataIndex: 'direction',
            key: 'direction',
        },
        {
            title: 'Роль',
            dataIndex: 'role',
            key: 'role',
            filters: [
                {
                    text: 'ADMIN',
                    value: 'Администратор',
                },
                {
                    text: 'MODERATOR',
                    value: 'Модератор',
                },
                {
                    text: 'EXPERT',
                    value: 'Эксперт',
                },
                {
                    text: 'TUTOR',
                    value: 'Тьютор',
                },
                {
                    text: 'CONSTRUCTOR',
                    value: 'Менеджер оценочных средств',
                },
                {
                    text: 'LPR',
                    value: 'Лицо принимающее решение',
                },
                {
                    text: 'TESTER',
                    value: 'Аттестуемый',
                },
            ],
            onFilter: (value, record) => record.role === value,
            render: (role) =>
                role === 'ADMIN'
                    ? 'Администратор'
                    : role === 'MODERATOR'
                    ? 'Модератор'
                    : role === 'EXPERT'
                    ? 'Эксперт'
                    : role === 'TUTOR'
                    ? 'Тьютор'
                    : role === 'CONSTRUCTOR'
                    ? 'Менеджер оценочных средств'
                    : role === 'LPR'
                    ? 'Лицо принимающее решение'
                    : role === 'TESTER'
                    ? 'Аттестуемый'
                    : '',
        },
        {
            title: 'Блокировка',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (is_active) => (is_active ? '-' : 'Заблокирован'),
        },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (id) => (
                <Button
                    type="primary"
                    onClick={() => {
                        navigate(ROUTES.LPR_USERS_DETAIL + `/${id}`)
                    }}
                >
                    Перейти
                </Button>
            ),
        },
    ]

    return (
        <>
            <Table columns={columns} dataSource={data?.results} rowKey="id" />
        </>
    )
}

export default UsersTable
