
import Table from 'antd/lib/table'
import { Button } from 'antd'

import PropTypes from 'prop-types'

const TestsBankTable = ({ data, loading, setId }) => {

    const onTableChange = (newPagination, filters, sorter) => {
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
            title: '№',
            dataIndex: 'id',
            key: 'id',
            sorter: true,
        },
        {
            title: 'Название тестов',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Квалификация',
            dataIndex: 'direction',
            key: 'direction',
            render: (direction) => <>{direction?.name}</>,
        },
        {
            title: 'Тип теста',
            dataIndex: 'unit_type',
            key: 'unit_type',
        },
        {
            title: 'Статус',
            dataIndex: 'is_active',
            key: 'is_active',

            render: (is_active) =>
                is_active === true ? 'Активна' : is_active === false ? 'Не активна' : '',
        },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: () => (
                <Button type="primary">
                    Изменить
                </Button>
            ),
        },
    ]

    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                rowKey="id"
                pagination={false}
                scroll={{ x: true }}
                onChange={onTableChange}
            />
        </>
    )
}

TestsBankTable.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    setId: PropTypes.func,
}

export default TestsBankTable
