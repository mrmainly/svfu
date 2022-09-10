import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Table from 'antd/lib/table'
import { Button, Pagination, Input, Select } from 'antd'

import { useGetAdminUsersQuery } from '../../../../services/AdminService'
import UserAddModal from '../modals/UserAddModal'
import { MyButton } from '../../../../components'
import { DynamicPathSlice } from '../../../../reducers/DynamicPathSlice'
import ROUTES from '../../../../routes'
import { rolesChoises } from '../../../../constants'
import './admin-users.css'

const UsersTable = () => {
    const { handlePath, handleFullName, handleRole, handleCurrentPath } = DynamicPathSlice.actions
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [modalNewUser, setModalNewUser] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const [role, setRole] = useState('')
    const [ordering, setOrdering] = useState('')
    const [fullName, setFullName] = useState('')
    const [application, setApplication] = useState('')
    const [isActive, setIsActive] = useState('')

    const { data, isFetching } = useGetAdminUsersQuery({
        currentPage: currentPage,
        role: role,
        ordering: ordering,
        fullName: fullName,
        application: application,
        isActive: isActive,
    })
    const selectRole = [
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
    ]
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: true,
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
            render: (role) => rolesChoises[role],
        },
        {
            title: 'Статус',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (is_active) => (is_active ? 'Активен' : 'Заблокирован'),
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

    useEffect(() => {
        setTotalPage(data?.count)
    }, [data])

    const onTableChange = (newPagination, filters, sorter) => {
        if (sorter?.order === 'descend') {
            {
                setOrdering('-id')
            }
        } else if (sorter?.order === 'ascend') {
            {
                setOrdering('id')
            }
        } else {
            {
                setOrdering('')
            }
        }
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
            <div className="inputs-container">
                <Input.Search
                    placeholder="ФИО"
                    enterButton
                    onSearch={(value) => {
                        const currValue = value
                        setFullName(currValue)
                    }}
                    className="input-search"
                ></Input.Search>
                <Input.Search
                    placeholder="Текущая аттестация"
                    enterButton
                    onSearch={(value) => {
                        const currValue = value
                        setApplication(currValue)
                    }}
                    className="input-search"
                ></Input.Search>
                <Select
                    placeholder="Роль"
                    className="input-search"
                    onChange={(value) => setRole(value)}
                >
                    <Select.Option value=""> Все роли</Select.Option>
                    {selectRole?.map((item, index) => (
                        <Select.Option value={item.value} key={index}>
                            {item.text}
                        </Select.Option>
                    ))}
                </Select>
                <Select
                    placeholder="Блокировка"
                    className="input-search"
                    onChange={(value) => setIsActive(value)}
                >
                    <Select.Option value="">Все статусы</Select.Option>
                    <Select.Option value="true">Активен</Select.Option>
                    <Select.Option value="false">Заблокирован</Select.Option>
                </Select>
            </div>
            <Table
                columns={columns}
                dataSource={data?.results}
                rowKey="id"
                loading={isFetching}
                pagination={false}
                onChange={onTableChange}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination
                    defaultCurrent={1}
                    total={totalPage}
                    pageSize={30}
                    style={{ marginTop: 20 }}
                    onChange={onChange}
                />
            </div>
        </>
    )
}

export default UsersTable
