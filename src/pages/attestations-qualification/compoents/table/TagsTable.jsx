import PropTypes from 'prop-types'

import Table from 'antd/lib/table'
import { Button } from 'antd'

const TagsTable = ({ data, loading, setCurrentData, handleOpen }) => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Название квалификации',
            dataIndex: 'name',
            key: 'name',
        },

        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (id, record) => (
                <Button
                    type="primary"
                    onClick={() => {
                        setCurrentData(record)
                        handleOpen()
                    }}
                >
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
            />
        </>
    )
}

TagsTable.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    setCurrentData: PropTypes.func,
    handleOpen: PropTypes.func,
}

export default TagsTable
