import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Table from 'antd/lib/table'
import { Button, Pagination } from 'antd'

import { useGetAdminUserQuery } from '../../../../services/PaginationService'
import UserAddModal from '../modals/UserAddModal'
import { MyButton } from '../../../../components'
import { DynamicPathSlice } from '../../../../reducers/DynamicPathSlice'
import ROUTES from '../../../../routes'

const UsersTable = () => {
    const { handlePath, handleFullName, handleRole, handleCurrentPath } = DynamicPathSlice.actions
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [modalNewUser, setModalNewUser] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const { data, isLoading } = useGetAdminUserQuery({ currentPage: currentPage })

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'ФИО',
            dataIndex: 'full_name',
            key: 'full_name',
        },
        {
            title: 'Текущая аттестация',
            dataIndex: 'active_application',
            key: 'active_application',
            render: (active_application) => (active_application ? active_application : '-'),
        },
        {
            title: 'Роль',
            dataIndex: 'role',
            key: 'role',
            filters: [
                {
                    text: 'Администратор',
                    value: 'ADMIN',
                },
                {
                    text: 'Модератор',
                    value: 'MODERATOR',
                },
                {
                    text: 'Эксперт',
                    value: 'EXPERT',
                },
                {
                    text: 'Тьютор',
                    value: 'TUTOR',
                },
                {
                    text: 'Менеджер оценочных средств',
                    value: 'CONSTRUCTOR',
                },
                {
                    text: 'Лицо принимающее решение',
                    value: 'LPR',
                },
                {
                    text: 'Аттестуемый',
                    value: 'TESTER',
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
                        navigate(ROUTES.ADMIN_USERS_DETAIL + `/${id}`)
                        dispatch(handlePath(ROUTES.ADMIN_USERS))
                        dispatch(handleRole(data?.results.filter((item) => item.id === id)[0].role))
                        dispatch(
                            handleFullName(
                                data?.results.filter((item) => item.id === id)[0].full_name
                            )
                        )
                        dispatch(handleCurrentPath(ROUTES.ADMIN_USERS_DETAIL + `/${id}`))
                    }}
                >
                    Перейти
                </Button>
            ),
        },
    ]

    const onChange = (page) => {
        setCurrentPage(page)
    }

    return (
        <>
            <MyButton
                style={{ marginBottom: '16px' }}
                onClick={() => {
                    setModalNewUser(true)
                }}
            >
                Создать пользователя
            </MyButton>
            <UserAddModal open={modalNewUser} setOpen={setModalNewUser} />
            <Table
                columns={columns}
                dataSource={data?.results}
                rowKey="id"
                loading={isLoading}
                pagination={false}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination
                    defaultCurrent={1}
                    total={data?.count}
                    pageSize={20}
                    style={{ marginTop: 20 }}
                    onChange={onChange}
                />
            </div>
        </>
    )
}

export default UsersTable
