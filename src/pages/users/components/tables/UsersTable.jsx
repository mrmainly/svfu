import { useNavigate } from 'react-router-dom'

import Table from 'antd/lib/table'
import { Button } from 'antd'
import PropTypes from 'prop-types'

import ROUTES from '../../../../routes'
import { rolesChoises } from '../../../../constants'

const UsersTable = ({ data, isLoading, setRole, setId }) => {
    const navigate = useNavigate()

    const onTableChange = (newPagination, filters, sorter) => {
        if (filters?.role?.length > 0) {
            {
                setRole(filters?.role[0])
            }
        } else {
            setRole('')
        }
        if (sorter?.order === 'descend') {
            {
                setId('-id')
            }
        } else if (sorter?.order === 'ascend') {
            {
                setId('id')
            }
        } else {
            {
                setId('')
            }
        }
    }

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
            render: (role) => rolesChoises[role],
            filterMultiple: false,
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
                        navigate(ROUTES.USERS_DETAIL + `/${id}`, {
                            state: {
                                type: 'LPR',
                            },
                        })
                    }}
                >
                    Перейти
                </Button>
            ),
        },
    ]

    return (
        <>
            <Table
                columns={columns}
                dataSource={data?.results}
                loading={isLoading}
                rowKey="id"
                pagination={false}
                scroll={{ x: true }}
                onChange={onTableChange}
            />
        </>
    )
}

UsersTable.propTypes = {
    data: PropTypes.object,
    isLoading: PropTypes.bool,
    setRole: PropTypes.func,
    setId: PropTypes.func,
    setName: PropTypes.func,
}

export default UsersTable
