import { Button, Table } from 'antd'

import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import ROUTES from '../../../../routes'
import { statusChoices } from '../../../../constants'

const UserApplicationsTable = ({ data, loading, setOrdering }) => {
    const navigate = useNavigate()

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

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: true,
        },
        {
            title: 'ФИО',
            dataIndex: ['user', 'full_name'],
            key: 'full_name',
        },
        {
            title: 'Название квалификации',
            dataIndex: ['direction', 'name'],
            key: 'direction',
        },
        {
            title: 'Должность',
            dataIndex: ['user', 'post'],
            key: 'post',
        },
        {
            title: 'Стаж работы',
            dataIndex: ['user', 'total_experience'],
            key: 'total_experience',
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <div>{statusChoices[status]}</div>,
        },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (id) => (
                <Button
                    type="primary"
                    onClick={() => navigate(`${ROUTES.USER_APPLICATIONS_DETAIL}/${id}`)}
                >
                    Просмотр
                </Button>
            ),
        },
    ]

    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            loading={loading}
            pagination={false}
            scroll={{ x: true }}
            onChange={onTableChange}
        />
    )
}

UserApplicationsTable.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    setOrdering: PropTypes.func,
}

export default UserApplicationsTable
