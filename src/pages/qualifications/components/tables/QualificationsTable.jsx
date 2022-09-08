import { Table } from 'antd'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import { MyButton } from '../../../../components'

const QualificationsTable = ({ data, loading, routes }) => {
    const navigate = useNavigate()

    const columns = [
        { title: '№ документа', dataIndex: 'name', key: 'name' },
        {
            title: 'Название квалификации',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Дата выдачи',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (id) => (
                <MyButton onClick={() => navigate(`${routes}/${id}`)}>Просмотр</MyButton>
            ),
        },
    ]
    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            loading={loading}
            scroll={{ x: true }}
        />
    )
}

QualificationsTable.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    routes: PropTypes.any,
}

export default QualificationsTable
